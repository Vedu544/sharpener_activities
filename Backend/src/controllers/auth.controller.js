import { successResponse, errorResponse } from "../utils/response.js";
import * as authService from "../services/auth.service.js";
import { validationResult } from "express-validator";

/**
 * Register a new user
 */
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array(), 400);

  try {
    const data = await authService.registerUser(req.body);
    return successResponse(res, "User registered successfully", data, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

/**
 * Login user
 */
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array(), 400);

  try {
    const data = await authService.loginUser(req.body);
    return successResponse(res, "Login successful", data, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

/**
 * Refresh token
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const data = await authService.refreshTokenUser(refreshToken);
    return successResponse(res, "Token refreshed successfully", data, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
