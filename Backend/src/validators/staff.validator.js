import { body, param } from "express-validator";

// Create staff validation
export const createStaffValidator = [
  body("name")
    .notEmpty()
    .withMessage("Staff name is required"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address"),

  body("phone")
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits"),

  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string"),
];

// Assign service to staff validation
export const assignServiceValidator = [
  param("staffId")
    .notEmpty()
    .withMessage("Staff ID is required"),

  body("serviceId")
    .notEmpty()
    .withMessage("Service ID is required"),
];
