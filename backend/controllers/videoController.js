import Groq from "groq-sdk";
import fs from "fs";
import { toFile } from "groq-sdk";
import Consultation from "../models/Consultation.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// const DAILY_URL = "https://api.daily.co/v1";
// const dailyHeaders = {
//   "Content-Type": "application/json",
//   "Authorization": `Bearer ${process.env.DAILY_API_KEY}`
// };

// POST /api/video/create-room
// export const createRoom = async (req, res) => {
//   try {
//     const { appointmentId, patientId, doctorId, patientName, doctorName, doctorSpeciality } = req.body;

//     // Return existing room if already created
//     const existing = await Consultation.findOne({ appointmentId });
//     if (existing?.roomUrl) return res.json({ success: true, roomUrl: existing.roomUrl });

//     // Create Daily.co room (expires in 2 hours)
//     const dailyRes = await fetch(`${DAILY_URL}/rooms`, {
//       method: "POST", headers: dailyHeaders,
//       body: JSON.stringify({
//         name: `prescripto-${appointmentId}`,
//         privacy: "public",
//         properties: { exp: Math.floor(Date.now() / 1000) + 7200 }
//       })
//     });
//     const room = await dailyRes.json();
//     if (room.error) throw new Error(room.error);

//     await Consultation.create({
//       appointmentId, patientId, doctorId,
//       patientName, doctorName, doctorSpeciality,
//       roomName: room.name, roomUrl: room.url, status: "scheduled"
//     });

//     res.json({ success: true, roomUrl: room.url });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// videoController.js — replace the entire createRoom function with this

export const createRoom = async (req, res) => {
  try {
    const { appointmentId, patientId, doctorId, patientName, doctorName, doctorSpeciality } = req.body;

    // Check if room already exists for this appointment
    const existing = await Consultation.findOne({ appointmentId });
    if (existing?.roomUrl) {
      return res.json({ success: true, roomUrl: existing.roomUrl });
    }

    // Jitsi — no API call needed, just construct the URL
    // Room name must be unique per appointment, hard to guess (for basic privacy)
    const roomName = `prescripto-${appointmentId}`;
    const roomUrl = `https://meet.jit.si/${roomName}`;

    // Save to DB exactly as before
    await Consultation.create({
      appointmentId, patientId, doctorId,
      patientName, doctorName, doctorSpeciality,
      roomName,
      roomUrl,
      status: "scheduled"
    });

    res.json({ success: true, roomUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/video/start
export const startCall = async (req, res) => {
  try {
    await Consultation.findOneAndUpdate(
      { appointmentId: req.body.appointmentId },
      { startTime: new Date(), status: "ongoing" }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/video/transcribe  (multipart: audio file + appointmentId)
// export const transcribeAudio = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: "No audio file" });
//     console.log("1");
//     console.log(req.file);
//     const transcription = await groq.audio.transcriptions.create({
//         file: fs.createReadStream(req.file.path),
//         model: "whisper-large-v3-turbo",
//         language: "en"
//     });
//     console.log("2");
//     fs.unlinkSync(req.file.path); // cleanup
//     console.log("3");
    
//     const transcript = transcription.text;
//     console.log("4");
//     await Consultation.findOneAndUpdate(
//         { appointmentId: req.body.appointmentId },
//         { transcript, endTime: new Date(), status: "completed" }
//     );
//     console.log("5");
//     res.json({ success: true, transcript });
// } catch (err) {
//     console.log("6");
//     if (req.file?.path) fs.unlinkSync(req.file.path);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

export const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No audio file" });

    const transcription = await groq.audio.transcriptions.create({
      // wrap the stream with toFile — gives it the correct name and type
      file: await toFile(
        fs.createReadStream(req.file.path),
        "consultation.webm",  // filename with extension so Groq knows the format
        { type: "audio/webm" }
      ),
      model: "whisper-large-v3-turbo",
      language: "en"
    });

    fs.unlinkSync(req.file.path);

    const transcript = transcription.text;
    await Consultation.findOneAndUpdate(
      { appointmentId: req.body.appointmentId },
      { transcript, endTime: new Date(), status: "completed" }
    );

    res.json({ success: true, transcript });
  } catch (err) {
    console.error("TRANSCRIBE ERROR:", err.message);
    if (req.file?.path) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/video/summarize  { appointmentId, transcript }
export const summarizeConsultation = async (req, res) => {
  try {
    const { appointmentId, transcript } = req.body;

    const prompt = `You are a medical consultation summarizer. Analyze this transcript and return ONLY a raw JSON object with no markdown fences.

Transcript: "${transcript}"

JSON format (use empty string or [] if info unavailable):
{
  "chiefComplaint": "main reason patient visited",
  "diagnosis": "doctor's assessment",
  "recommendations": ["recommendation 1", "recommendation 2"],
  "medications": ["medication with dosage if mentioned"],
  "followUp": "follow-up instructions",
  "rawSummary": "2-3 sentence plain English summary"
}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.1
    });

    let text = response.choices[0].message.content.trim()
      .replace(/```json\n?|\n?```/g, "").trim();
    const summary = JSON.parse(text);

    await Consultation.findOneAndUpdate(
      { appointmentId },
      { aiSummary: summary, status: "completed" }
    );
    res.json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/video/consultation/:appointmentId
export const getConsultation = async (req, res) => {
  try {
    const c = await Consultation.findOne({ appointmentId: req.params.appointmentId });
    if (!c) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, consultation: c });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};