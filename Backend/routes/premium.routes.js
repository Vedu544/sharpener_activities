import express from "express";
import {
  createPremiumOrder,
  verifyPremiumPayment,
  premiumWebhook,
} from "../controllers/premium.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-order", authenticate, createPremiumOrder);
router.post("/verify", authenticate, verifyPremiumPayment);
router.post("/webhook", premiumWebhook);



export default router;
