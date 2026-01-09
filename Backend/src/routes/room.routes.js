import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createPersonalRoom,
  createGroupRoom,
  getUserRooms,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/personal", authMiddleware, createPersonalRoom);
router.post("/group", authMiddleware, createGroupRoom);
router.get("/", authMiddleware, getUserRooms);

export default router;
