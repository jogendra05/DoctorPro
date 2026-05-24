// consultation-service/models/Consultation.js
import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, unique: true },
  patientId:     { type: String, required: true },
  doctorId:      { type: String, required: true },
  patientName:   { type: String, required: true },
  doctorName:    { type: String, required: true },
  doctorSpeciality: { type: String, default: "" },
  roomName:      { type: String },
  roomUrl:       { type: String },
  startTime:     { type: Date },
  endTime:       { type: Date },
  durationMinutes: { type: Number },
  transcript:    { type: String, default: "" },
  aiSummary: {
    chiefComplaint:  { type: String, default: "" },
    diagnosis:       { type: String, default: "" },
    recommendations: [{ type: String }],
    medications:     [{ type: String }],
    followUp:        { type: String, default: "" },
    rawSummary:      { type: String, default: "" }
  },
  status: {
    type: String,
    enum: ["scheduled", "ongoing", "completed"],
    default: "scheduled"
  }
}, { timestamps: true });

export default mongoose.models.Consultation || mongoose.model("Consultation", consultationSchema);
