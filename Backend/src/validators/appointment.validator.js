import { body } from "express-validator";

/**
 * Book Appointment Validator
 */
export const bookAppointmentValidator = [
  body("serviceId")
    .notEmpty()
    .withMessage("Service ID is required")
    .isUUID()
    .withMessage("Service ID must be a valid UUID"),

  body("staffId")
    .notEmpty()
    .withMessage("Staff ID is required")
    .isUUID()
    .withMessage("Staff ID must be a valid UUID"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Appointment date must be a valid date"),

  body("appointmentTime")
    .notEmpty()
    .withMessage("Appointment time is required"),
];

/**
 * Reschedule Appointment Validator
 */
export const rescheduleAppointmentValidator = [
  body("appointmentDate")
    .notEmpty()
    .withMessage("New appointment date is required")
    .isISO8601()
    .withMessage("Appointment date must be a valid date"),

  body("appointmentTime")
    .notEmpty()
    .withMessage("New appointment time is required"),
];
