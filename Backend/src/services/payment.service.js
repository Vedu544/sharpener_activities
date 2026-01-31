import Payment from "../models/Payment.js";
import axios from "axios";
import config from "../config/env.js";

export const createPayment = async ({
  appointmentId,
  amount,
  method,
  customerEmail = "test@test.com",
  customerPhone = "9999999999",
}) => {


  const response = await axios.post(
    "https://sandbox.cashfree.com/pg/orders",
    {
      order_id: `order_${Date.now()}`,
      order_amount: Number(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: appointmentId,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
    },
    {
      headers: {
        "x-client-id": config.cashfree.appId,
        "x-client-secret": config.cashfree.secretKey,
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
      },
    }
  );

  const { payment_session_id, order_id } = response.data;

  const payment = await Payment.create({
    appointmentId,
    amount,
    method,
    orderId: order_id,
    paymentSessionId: payment_session_id,
    status: "PENDING",
  });

  return {
    paymentId: payment.id,
    orderId: order_id,
    paymentSessionId: payment_session_id,
  };
};
