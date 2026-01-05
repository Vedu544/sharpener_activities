import express from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requirePremium } from "../middleware/isPremium.middleware.js";

const router = express.Router();

router.get("/", authenticate, requirePremium, getLeaderboard);

export default router;
