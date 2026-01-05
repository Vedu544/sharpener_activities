// controllers/password.controller.js
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { User, ForgotPasswordRequest } from "../models/index.js";
import { sendResetPasswordEmail } from "../services/email.service.js";

/**
 * Step 1: User submits email to request password reset
 * POST /password/forgotpassword
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    console.log("📧 Received email:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If this email exists, a reset link has been sent",
      });
    }

    // Deactivate previous requests
    await ForgotPasswordRequest.update(
      { isActive: false },
      { where: { userId: user.id, isActive: true } }
    );

    // Create new request
    const request = await ForgotPasswordRequest.create({
      id: uuidv4(),
      userId: user.id,
      isActive: true,
    });

    // Generate reset link
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${request.id}`;

    console.log("=================================");
    console.log("🔗 RESET LINK:", resetLink);
    console.log("=================================");

    // Send email
    const emailResult = await sendResetPasswordEmail(email, resetLink);

    if (emailResult.success) {
      console.log("✅ Email sent to:", email);
      return res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } else {
      console.log("⚠️ Email failed, but link created");
      return res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
        // Dev only - remove in production
        devNote: "Email service issue. Check console for link.",
        resetLink: resetLink,
      });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    next(error);
  }
};

/**
 * Step 2: Validate reset link
 * GET /password/resetpassword/:id
 */
export const resetPasswordForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("🔍 Validating reset ID:", id);

    const request = await ForgotPasswordRequest.findOne({
      where: { id, isActive: true },
      include: [{ model: User }]
    });

    if (!request) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link"
      });
    }

    console.log("✅ Valid request for user:", request.User?.email);

    return res.status(200).json({
      success: true,
      message: "Valid reset link",
      requestId: id,
      userEmail: request.User?.email,
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    next(error);
  }
};

/**
 * Step 3: Update password
 * POST /password/updatepassword
 */
export const updatePassword = async (req, res, next) => {
  try {
    const { requestId, newPassword } = req.body;

    console.log("🔄 Updating password for request:", requestId);

    // Validate inputs
    if (!requestId || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Request ID and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Find active request with user
    const request = await ForgotPasswordRequest.findOne({
      where: { id: requestId, isActive: true },
      include: [{ model: User }]
    });

    if (!request || !request.User) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset request"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await request.User.update({ password: hashedPassword });

    // Deactivate reset request
    await request.update({ isActive: false });

    console.log("✅ Password updated for:", request.User.email);

    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    next(error);
  }
};