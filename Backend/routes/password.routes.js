// src/routes/password.routes.js
import express from "express";
import { 
  forgotPassword, 
  resetPasswordForm, 
  updatePassword 
} from "../controllers/password.controller.js";

const router = express.Router();

// Step 1: Request password reset (send email)
router.post("/forgotpassword", forgotPassword);

// Step 2: Validate reset link (when user clicks link)
router.get("/resetpassword/:id", resetPasswordForm);

// Step 3: Update password with new one
router.post("/updatepassword", updatePassword);

export default router;