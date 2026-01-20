import * as serviceService from "../services/service.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { validationResult } from "express-validator";

// Create service (Admin only)
export const createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array(), 400);

  try {
    const service = await serviceService.createService(req.body);
    return successResponse(res, "Service created", service, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Update service (Admin)
export const updateService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array(), 400);

  try {
    const service = await serviceService.updateService(req.params.id, req.body);
    return successResponse(res, "Service updated", service, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    await serviceService.deleteService(req.params.id);
    return successResponse(res, "Service deleted", null, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    return successResponse(res, "Services fetched", services, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
