import express from "express";
import { createPayment, verifyPayment } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create payment
router.post("/create", authMiddleware, createPayment);

// Verify payment
router.post("/verify", authMiddleware, verifyPayment);

export default router;
