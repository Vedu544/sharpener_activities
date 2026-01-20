import * as reviewService from "../services/review.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Add review
export const addReview = async (req, res) => {
  try {
    const review = await reviewService.addReview(req.user.id, req.body);
    return successResponse(res, "Review added", review, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Staff respond to review
export const respondReview = async (req, res) => {
  try {
    const review = await reviewService.respondReview(req.params.id, req.body.response);
    return successResponse(res, "Response added", review, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Get all reviews for staff/service
export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviews(req.query);
    return successResponse(res, "Reviews fetched", reviews, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
