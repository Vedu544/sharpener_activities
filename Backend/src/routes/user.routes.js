import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { authMiddleware} from "../middlewares/auth.middleware.js"
import { updateProfileValidator } from "../validators/user.validator.js";

const router = express.Router();

// Get profile
router.get("/me", authMiddleware, getProfile);

// Update profile
router.put("/me", authMiddleware, updateProfileValidator, updateProfile);

export default router;
