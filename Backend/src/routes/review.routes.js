import express from "express";
import { addReview, respondReview, getReviews } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { addReviewValidator, respondReviewValidator } from "../validators/review.validator.js";

const router = express.Router();

// Add review (user)
router.post("/", authMiddleware, addReviewValidator, addReview);

// Respond to review (staff/admin)
router.post("/:id/respond", authMiddleware, roleMiddleware("staff", "admin"), respondReviewValidator, respondReview);

// Get reviews
router.get("/", getReviews);

export default router;
