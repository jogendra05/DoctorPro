import Groq from "groq-sdk";
import Consultation from "../models/Consultation.js"; 

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const detectIntent = async (userMessage) => {
  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `Classify the message into exactly one category. 
CONSULTATION — asking about past video consultations, what doctor said/recommended, prescribed medicines, diagnosis, follow-up instructions.
MEDICAL — general medical questions, symptoms, diseases, treatments, health advice.
Respond ONLY with valid JSON: {"intent":"CONSULTATION"} or {"intent":"MEDICAL"}`
        },
        { role: "user", content: userMessage }
      ],
      max_tokens: 20,
      temperature: 0
    });
    return JSON.parse(res.choices[0].message.content.trim()).intent;
  } catch (err) {
    console.error("detectIntent failed:", err.message); 
    return "MEDICAL";
  }
};

export const handleConsultationQuery = async (userMessage, patientId) => {

  console.log("Received patientId:", patientId);         
  console.log("patientId type:", typeof patientId); 
  const consultations = await Consultation.find({ patientId, status: "completed" })
    .sort({ createdAt: -1 })
    .limit(5);

    const allConsultations = await Consultation.find({}).limit(3);
    console.log("All consultations in DB:", JSON.stringify(allConsultations.map(c => ({
    patientId: c.patientId,
    status: c.status,
    appointmentId: c.appointmentId
    }))));

  if (!consultations.length) {
    return "I couldn't find any completed video consultations for you.";
  }

  const context = consultations.map((c, i) => `
Consultation ${i + 1} — ${new Date(c.createdAt).toLocaleDateString()} with ${c.doctorName} (${c.doctorSpeciality}):
  Chief complaint: ${c.aiSummary?.chiefComplaint || "N/A"}
  Diagnosis: ${c.aiSummary?.diagnosis || "N/A"}
  Recommendations: ${c.aiSummary?.recommendations?.join(", ") || "N/A"}
  Medications: ${c.aiSummary?.medications?.join(", ") || "N/A"}
  Follow-up: ${c.aiSummary?.followUp || "N/A"}
  Summary: ${c.aiSummary?.rawSummary || "N/A"}
  `.trim()).join("\n\n");
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a medical assistant for Prescripto. Answer the patient's question using ONLY the consultation history below. Be concise and specific. If the answer isn't in the data, say so clearly.

${context}`
      },
      { role: "user", content: userMessage }
    ],
    max_tokens: 500,
    temperature: 0.2
  });

  return res.choices[0].message.content;
};
