import express from "express";
import multer from "multer";
import { createRoom, startCall, transcribeAudio, summarizeConsultation, getConsultation } from "../controllers/videoController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/create-room", createRoom);
router.post("/start", startCall);
router.post("/transcribe", upload.single("audio"), transcribeAudio);
router.post("/summarize", summarizeConsultation);
router.get("/consultation/:appointmentId", getConsultation);

export default router;