import * as adminService from "../services/admin.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Get all users (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    return successResponse(res, "Users fetched", users, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Manage appointments (Admin)
export const manageAppointments = async (req, res) => {
  try {
    const appointments = await adminService.getAllAppointments();
    return successResponse(res, "Appointments fetched", appointments, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
