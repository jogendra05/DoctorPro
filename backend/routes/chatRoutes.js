import express from "express";
import { detectIntent, handleConsultationQuery } from "../controllers/chatController.js";
import userAuth from "../middlewares/authUser.js";

const router = express.Router();

router.post("/intent", userAuth, async (req, res) => {
  const { message, userId } = req.body;
  try {
    const intent = await detectIntent(message);
    if (intent === "CONSULTATION") {
      const reply = await handleConsultationQuery(message, userId);
      res.json({ success: true, reply, source: "consultation" });
    } else {
      // Forward to your FastAPI RAG service
      const ragRes = await fetch(`http://localhost:4000/api/chat/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const ragData = await ragRes.json();
      res.json({ success: true, reply: ragData.response, source: "rag" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;