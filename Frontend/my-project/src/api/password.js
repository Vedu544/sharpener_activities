// src/api/password.js
import api from "./axios";

/**
 * Request password reset email
 * POST /password/forgotpassword
 */
export const forgotPassword = async (email) => {
  const response = await api.post("/password/forgotpassword", { email });
  return response.data;
};

/**
 * Validate reset token/link
 * GET /password/resetpassword/:id
 */
export const validateResetToken = async (requestId) => {
  const response = await api.get(`/password/resetpassword/${requestId}`);
  return response.data;
};

/**
 * Update password with new one
 * POST /password/updatepassword
 */
export const updatePassword = async (requestId, newPassword) => {
  const response = await api.post("/password/updatepassword", {
    requestId,
    newPassword,
  });
  return response.data;
};