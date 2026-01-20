import { body } from "express-validator";

export const createAppointmentValidator = [
  body("serviceId")
    .notEmpty()
    .withMessage("Service ID is required"),

  body("staffId")
    .notEmpty()
    .withMessage("Staff ID is required"),

  body("appointmentDate")
    .isDate()
    .withMessage("Valid appointment date is required"),

  body("appointmentTime")
    .notEmpty()
    .withMessage("Appointment time is required"),
];

export const rescheduleAppointmentValidator = [
  body("appointmentDate")
    .isDate()
    .withMessage("Valid appointment date is required"),

  body("appointmentTime")
    .notEmpty()
    .withMessage("Appointment time is required"),
];
