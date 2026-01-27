import { body } from "express-validator";
import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";

/**
 * Common validation handler
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(
      res,
      "Validation failed",
      errors.array(),
      422
    );
  }
  next();
};

/**
 * Update Profile Validator
 */
export const updateProfileValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  validate
];
