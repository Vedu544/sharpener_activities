import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getMessagesByRoom,
} from "../controllers/message.controller.js";

const router = express.Router();

/* Send message */
router.post("/", protect, sendMessage);

/* Get messages by room */
router.get("/:roomId", protect, getMessagesByRoom);

export default router;
