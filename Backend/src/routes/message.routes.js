import express from "express";
import Message from "../models/Message.model.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all messages of a room
router.get("/:roomId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
