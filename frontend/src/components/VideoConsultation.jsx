import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BACKEND_URL + "/api";

const formatDate = (d) => {
  if (!d) return "";
  const [day, month, year] = d.split("_");
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const fmtTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function Badge({ status }) {
  const map = {
    scheduled: "text-yellow-700 bg-yellow-50 border border-yellow-200",
    ongoing: "text-green-700 bg-green-50 border border-green-200",
    completed: "text-blue-700 bg-blue-50 border border-blue-200",
  };
  const label = {
    scheduled: "Scheduled",
    ongoing: "In Progress",
    completed: "Completed",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}

function Spinner({ label }) {
  return (
    <div className="flex items-center gap-2 text-indigo-600">
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function DoctorAvatar({ image, name }) {
  return (
    <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden flex-shrink-0">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <svg
          className="w-7 h-7 text-indigo-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}
    </div>
  );
}

// ─── Phase: Pre-call ───────────────────────────────────────────────
function PreCall({ appt, onJoin, loading, error }) {
  const { docData, userData, slotDate, slotTime } = appt;
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div
          className="px-6 py-5"
          style={{
            background: "linear-gradient(135deg,#5f6FFF 0%,#7c8bff 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">
                Video Consultation
              </h2>
              <p className="text-indigo-200 text-sm mt-0.5">
                Join your scheduled appointment
              </p>
            </div>
            <Badge status="scheduled" />
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Doctor info */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: "#EAF4FF" }}
          >
            <DoctorAvatar image={docData.image} name={docData.name} />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                <span className="text-green-600 text-xs font-semibold">
                  Available
                </span>
              </div>
              <p className="font-semibold text-gray-800">{docData.name}</p>
              <p className="text-gray-500 text-sm">{docData.speciality}</p>
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Patient", userData.name],
              ["Fee", `$${docData.fees}`],
              ["Date", formatDate(slotDate)],
              ["Time", slotTime],
            ].map(([label, val]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                  {label}
                </p>
                <p className="text-gray-800 font-semibold text-sm leading-tight">
                  {val}
                </p>
              </div>
            ))}
          </div>

          {/* Info note */}
          {/* <div className="flex gap-3 rounded-xl p-4 border border-indigo-100 bg-indigo-50">
            <svg
              className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-indigo-700 text-sm">
              Your microphone audio will be recorded and transcribed to generate
              an AI summary after the call.
            </p>
          </div> */}

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Join button */}
          <button
            onClick={onJoin}
            disabled={loading}
            className="w-full text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            style={{ background: "#5f6FFF" }}
            onMouseEnter={(e) =>
              !loading && (e.currentTarget.style.background = "#4a5ae8")
            }
            onMouseLeave={(e) =>
              !loading && (e.currentTarget.style.background = "#5f6FFF")
            }
          >
            {loading ? (
              <Spinner label="Setting up your room…" />
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 10l4.553-2.669A1 1 0 0121 8.232v7.536a1 1 0 01-1.447.894L15 14v-4zM3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                Join Video Call
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Phase: In-call ────────────────────────────────────────────────
function InCall({ roomUrl, appt, duration, isRecording, onEnd }) {
  return (
    <div className="max-w-5xl mx-auto space-y-3">
      {/* Controls bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <DoctorAvatar image={appt.docData.image} name={appt.docData.name} />
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {appt.docData.name}
            </p>
            <p className="text-gray-400 text-xs">{appt.docData.speciality}</p>
          </div>
          <Badge status="ongoing" />
        </div>
        <div className="flex items-center gap-4">
          {isRecording && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-red-500 text-xs font-semibold">REC</span>
            </div>
          )}
          <span className="font-mono text-sm bg-gray-50 px-3 py-1 rounded-lg text-gray-600">
            {fmtTime(duration)}
          </span>
          <button
            onClick={onEnd}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            End Call
          </button>
        </div>
      </div>

      {/* Video iframe */}
      <div
        className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800"
        style={{ height: "520px" }}
      >
        {/* <iframe
          src={roomUrl}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          className="w-full h-full border-0"
          title="Video Consultation"
        /> */}

        <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
        allowFullScreen
        className="w-full h-full border-0"
        title="Video Consultation"
        />
      </div>
    </div>
  );
}

// ─── Phase: Post-call ──────────────────────────────────────────────
function PostCall({ transcript, summary, loading, appt }) {
  const [tab, setTab] = useState("summary");
  const isProcessing = loading.transcribe || loading.summary;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div
          className="px-6 py-5"
          style={{
            background: "linear-gradient(135deg,#5f6FFF 0%,#7c8bff 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">
                Consultation Complete
              </h2>
              <p className="text-indigo-200 text-sm mt-0.5">
                {appt.docData.name} · {appt.slotTime}
              </p>
            </div>
            <Badge status="completed" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {["summary", "transcript"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "summary" ? "AI Summary" : "Transcript"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {isProcessing ? (
            <Processing transcribing={loading.transcribe} />
          ) : tab === "summary" ? (
            <SummaryView summary={summary} />
          ) : (
            <TranscriptView transcript={transcript} />
          )}
        </div>
      </div>

      {/* Chatbot hint */}
      {!isProcessing && summary && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-indigo-700 text-sm">
            <span className="font-semibold">Tip:</span> You can ask the chatbot
            "What did Dr. {appt.docData.name.split(" ").pop()} recommend?" — it
            now has access to this consultation summary.
          </p>
        </div>
      )}
    </div>
  );
}

function Processing({ transcribing }) {
  return (
    <div className="flex flex-col items-center py-12 gap-4">
      <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center">
        <svg
          className="animate-spin w-8 h-8 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-gray-800 font-semibold">
          {transcribing
            ? "Transcribing your consultation…"
            : "Generating AI summary…"}
        </p>
        <p className="text-gray-400 text-sm mt-1">This takes 15–30 seconds</p>
      </div>
    </div>
  );
}

function SummaryView({ summary }) {
  if (!summary)
    return (
      <p className="text-center text-gray-400 py-8 text-sm">No summary yet.</p>
    );
  return (
    <div className="space-y-4">
      {/* AI generated blurb */}
      <div className="rounded-xl p-4 border border-indigo-100 bg-indigo-50">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span className="text-indigo-800 text-sm font-semibold">
            AI-generated summary
          </span>
        </div>
        <p className="text-indigo-700 text-sm leading-relaxed">
          {summary.rawSummary}
        </p>
      </div>

      {/* Detail rows */}
      <div className="space-y-3">
        {summary.chiefComplaint && (
          <DetailRow
            icon="🩺"
            label="Chief complaint"
            value={summary.chiefComplaint}
          />
        )}
        {summary.diagnosis && (
          <DetailRow icon="📋" label="Diagnosis" value={summary.diagnosis} />
        )}
        {summary.followUp && (
          <DetailRow icon="📅" label="Follow-up" value={summary.followUp} />
        )}
      </div>

      {/* Recommendation list */}
      {summary.recommendations?.length > 0 && (
        <ListCard
          icon="✅"
          label="Recommendations"
          items={summary.recommendations}
          color="green"
        />
      )}

      {/* Medication list */}
      {summary.medications?.length > 0 && (
        <ListCard
          icon="💊"
          label="Medications prescribed"
          items={summary.medications}
          color="blue"
        />
      )}

      <p className="text-gray-400 text-xs pt-1">
        AI-generated. Always follow your doctor's direct advice.
      </p>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 flex gap-3 items-start">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-gray-800 text-sm leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

function ListCard({ icon, label, items, color }) {
  const styles = {
    green: "bg-green-50 border-green-100 text-green-800",
    blue: "bg-blue-50 border-blue-100 text-blue-800",
  };
  return (
    <div className={`border rounded-xl p-4 ${styles[color]}`}>
      <p className="font-semibold text-sm mb-3">
        {icon} {label}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TranscriptView({ transcript }) {
  if (!transcript)
    return (
      <p className="text-center text-gray-400 py-8 text-sm">
        No transcript available.
      </p>
    );
  return (
    <div className="bg-gray-50 rounded-xl p-5 max-h-72 overflow-y-auto">
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
        {transcript}
      </p>
    </div>
  );
}

export default function VideoConsultation() {
  const { appointmentId } = useParams();
  const [appt, setAppt] = useState(null);
  const [apptLoading, setApptLoading] = useState(true);
  const [phase, setPhase] = useState("pre-call");
  const [roomUrl, setRoomUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState({ room: false, transcribe: false, summary: false });
  const [error, setError] = useState("");

  const mrRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const setLoad = (k, v) => setLoading((p) => ({ ...p, [k]: v }));

    useEffect(() => {
    const fetchAppointment = async () => {
        try {
        // Step 1 — fetch appointment as before
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/appointment/${appointmentId}`,
            { headers: { token: localStorage.getItem("token") } }
        );
        const data = await res.json();
        setAppt(data.appointment);

        // Step 2 — check if consultation already completed for this appointment
        const cRes = await fetch(
            `${API_BASE}/video/consultation/${appointmentId}`
        );
        const cData = await cRes.json();

        if (cData.success && cData.consultation?.status === "completed") {
            // Restore saved data from DB and skip straight to summary page
            setTranscript(cData.consultation.transcript || "");
            setSummary(cData.consultation.aiSummary || null);
            setPhase("post-call");
        }
        } catch (err) {
        console.error("Failed to load appointment", err);
        } finally {
        setApptLoading(false);
        }
    };
    fetchAppointment();
    }, [appointmentId]);

  // ── Cleanup — MUST be here before any early returns ────────────
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ── Early returns AFTER all hooks ──────────────────────────────
  if (apptLoading) return <div className="text-center p-10">Loading appointment...</div>;
  if (!appt) return <div className="text-center p-10 text-red-500">Appointment not found.</div>;

  // ── Join call ──────────────────────────────────────────────────
  const handleJoin = async () => {
    setLoad("room", true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/video/create-room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appt._id,
          patientId: appt.userId,
          doctorId: appt.docId,
          patientName: appt.userData.name,
          doctorName: appt.docData.name,
          doctorSpeciality: appt.docData.speciality,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setRoomUrl(data.roomUrl);
      setPhase("in-call");
    //   startRecording();
    //   startTimer();
    setTimeout(() => {
    startRecording();
    startTimer();
    }, 20000);
      fetch(`${API_BASE}/video/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: appt._id }),
      });
    } catch (e) {
      setError(e.message || "Failed to start consultation. Check the microservice is running.");
    } finally {
      setLoad("room", false);
    }
  };

  // ── Audio recording ────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mrRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start(1000);
      setIsRecording(true);
    } catch {
      setIsRecording(false);
    }
  };

  const stopRecording = () =>
    new Promise((resolve) => {
      if (!mrRef.current || mrRef.current.state === "inactive") return resolve(null);
      mrRef.current.onstop = () =>
        resolve(new Blob(chunksRef.current, { type: "audio/webm" }));
      mrRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
    });

  // ── Timer ──────────────────────────────────────────────────────
  const startTimer = () => {
    setDuration(0);
    timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
  };

  // ── End call ───────────────────────────────────────────────────
  const handleEnd = async () => {
    clearInterval(timerRef.current);
    const blob = await stopRecording();
    setPhase("post-call");
    if (blob && blob.size > 2000) {
      await transcribeAndSummarize(blob);
    } else {
      setSummary({
        chiefComplaint: "Consultation completed",
        diagnosis: "Please refer to your doctor's verbal advice",
        recommendations: ["Follow up with doctor as discussed during the call"],
        medications: [],
        followUp: "As advised during the video consultation",
        rawSummary: "Consultation completed successfully. Audio transcription was unavailable — please enable microphone access for AI summaries.",
      });
    }
  };

  // ── Transcribe → Summarize ─────────────────────────────────────
  const transcribeAndSummarize = async (blob) => {
    setLoad("transcribe", true);
    try {
      const fd = new FormData();
      fd.append("audio", blob, "consultation.webm");
      fd.append("appointmentId", appt._id);
      const tRes = await fetch(`${API_BASE}/video/transcribe`, { method: "POST", body: fd });
      const tData = await tRes.json();
      setLoad("transcribe", false);

      if (tData.success && tData.transcript) {
        setTranscript(tData.transcript);
        setLoad("summary", true);
        const sRes = await fetch(`${API_BASE}/video/summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: appt._id, transcript: tData.transcript }),
        });
        const sData = await sRes.json();
        if (sData.success) setSummary(sData.summary);
        setLoad("summary", false);
      }
    } catch {
      setLoad("transcribe", false);
      setLoad("summary", false);
      setError("Processing failed. The summary will be available later in your consultation history.");
    }
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className=" bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5 cursor-pointer">
          {/* <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#5f6FFF" }}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13H7v-2h6v2zm3-4H7v-2h9v2z" />
            </svg>
          </div> */}
          {/* <span className="font-bold text-gray-800 text-lg">Prescripto</span> */}
        </div>
        {/* <span className="text-sm text-gray-400 font-medium hidden sm:block">
          {phase === "pre-call" && "Appointment Details"}
          {phase === "in-call" && "Consultation in Progress"}
          {phase === "post-call" && "Consultation Summary"}
        </span> */}
        <div className="w-24" />
      </nav>

      <div className="p-4 sm:p-6 lg:p-8">
        {phase === "pre-call" && <PreCall appt={appt} onJoin={handleJoin} loading={loading.room} error={error} />}
        {phase === "in-call" && <InCall roomUrl={roomUrl} appt={appt} duration={duration} isRecording={isRecording} onEnd={handleEnd} />}
        {phase === "post-call" && <PostCall transcript={transcript} summary={summary} loading={loading} appt={appt} />}
      </div>
    </div>
  );
}