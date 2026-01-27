import { body, param } from "express-validator";

// Add review
export const addReviewValidator = [
  body("serviceId")
    .notEmpty()
    .withMessage("Service ID is required")
    .isInt()
    .withMessage("Service ID must be a number"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment")
    .optional()
    .isString()
    .withMessage("Comment must be a string"),
];

// Respond to review (Admin/Staff)
export const respondReviewValidator = [
  param("id")
    .notEmpty()
    .withMessage("Review ID is required")
    .isInt()
    .withMessage("Review ID must be a number"),

  body("response")
    .notEmpty()
    .withMessage("Response is required")
    .isString()
    .withMessage("Response must be a string"),
];
