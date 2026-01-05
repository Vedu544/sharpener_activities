// src/hooks/usePassword.js
import { useState } from "react";
import { forgotPassword, validateResetToken, updatePassword } from "../api/password";
import { showSuccess, showError } from "../utils/toast";

export const usePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Request password reset link
   */
  const requestPasswordReset = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await forgotPassword(email);
      showSuccess(data.message || "Reset link sent to your email");
      
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send reset link";
      setError(message);
      showError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Validate reset link/token
   */
  const validateToken = async (requestId) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await validateResetToken(requestId);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Invalid or expired link";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update password
   */
  const resetPassword = async (requestId, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await updatePassword(requestId, newPassword);
      showSuccess(data.message || "Password updated successfully");
      
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update password";
      setError(message);
      showError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    requestPasswordReset,
    validateToken,
    resetPassword,
  };
};