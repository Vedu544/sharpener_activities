import { body } from "express-validator";

export const createServiceValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Service name is required"),

  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be in minutes"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid number"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const updateServiceValidator = [
  body("name").optional().isString(),
  body("duration").optional().isInt({ min: 1 }),
  body("price").optional().isFloat({ min: 0 }),
  body("isActive").optional().isBoolean(),
];
