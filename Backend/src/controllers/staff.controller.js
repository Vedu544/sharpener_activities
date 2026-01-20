import * as staffService from "../services/staff.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Create staff
export const createStaff = async (req, res) => {
  try {
    const staff = await staffService.createStaff(req.body);
    return successResponse(res, "Staff created", staff, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await staffService.getAllStaff();
    return successResponse(res, "Staff fetched", staffList, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Assign services to staff
export const assignServices = async (req, res) => {
  try {
    const staff = await staffService.assignServicesToStaff(req.params.id, req.body.serviceIds);
    return successResponse(res, "Services assigned to staff", staff, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
