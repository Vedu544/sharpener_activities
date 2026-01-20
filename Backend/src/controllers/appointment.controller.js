import * as appointmentService from "../services/appointment.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { validationResult } from "express-validator";

// Book appointment
export const bookAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array(), 400);

  try {
    const appointment = await appointmentService.bookAppointment(req.user.id, req.body);
    return successResponse(res, "Appointment booked", appointment, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Reschedule appointment
export const rescheduleAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array(), 400);

  try {
    const appointment = await appointmentService.rescheduleAppointment(req.params.id, req.body);
    return successResponse(res, "Appointment rescheduled", appointment, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.cancelAppointment(req.params.id);
    return successResponse(res, "Appointment cancelled", appointment, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Get user appointments
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getUserAppointments(req.user.id);
    return successResponse(res, "Appointments fetched", appointments, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
