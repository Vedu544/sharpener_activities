import express from "express";
import {
  bookAppointment,
  getUserAppointments,
  rescheduleAppointment,
  cancelAppointment,
} from "../controllers/appointment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { bookAppointmentValidator, rescheduleAppointmentValidator } from "../validators/appointment.validator.js";

const router = express.Router();

// Book appointment
router.post("/", authMiddleware, bookAppointmentValidator, bookAppointment);

// Get user appointments
router.get("/", authMiddleware, getUserAppointments);

// Reschedule appointment
router.put("/:id/reschedule", authMiddleware, rescheduleAppointmentValidator, rescheduleAppointment);

// Cancel appointment
router.delete("/:id/cancel", authMiddleware, cancelAppointment);

export default router;
