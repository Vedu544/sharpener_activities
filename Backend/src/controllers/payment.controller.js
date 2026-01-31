import * as paymentService from "../services/payment.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import Payment from "../models/Payment.js";

export const createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req.body);
    
    return successResponse(res, "Payment created", result, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, err.message, 400);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error("Payment not found");

    payment.status = "SUCCESS";
    await payment.save();

    return successResponse(res, "Payment verified", payment, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
