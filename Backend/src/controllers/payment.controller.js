import * as paymentService from "../services/payment.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Create payment
export const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    return successResponse(res, "Payment created", payment, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const result = await paymentService.verifyPayment(req.body);
    return successResponse(res, "Payment verified", result, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
