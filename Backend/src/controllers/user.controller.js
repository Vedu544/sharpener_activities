import db from "../models/index.js";
import { successResponse, errorResponse } from "../utils/response.js";
import * as userService from "../services/user.service.js";

// Get current logged-in user profile
export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    return successResponse(res, "User profile fetched", user, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
    return successResponse(res, "Profile updated successfully", updatedUser, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
