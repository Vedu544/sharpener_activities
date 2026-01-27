import express from "express";
import { addReview, respondReview, getReviews } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { addReviewValidator, respondReviewValidator } from "../validators/review.validator.js";

const router = express.Router();

// Add review (user)
router.post("/add", authMiddleware, addReviewValidator, addReview);

// Respond to review (staff/admin)
router.post("/:id/respond", authMiddleware, roleMiddleware("staff", "ADMIN"), respondReviewValidator, respondReview);

// Get reviews
router.get("/", getReviews);

export default router;
