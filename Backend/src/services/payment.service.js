import axios from "axios";
import config from "../config/env.js";

/**
 * Create Cashfree payment order
 */
export const createPaymentOrder = async ({ amount, orderId, customerPhone, customerEmail }) => {
  const url = `${config.CASHFREE_ENV === "sandbox" ? "https://test.cashfree.com" : "https://api.cashfree.com"}/api/v2/cftoken/order`;
  const payload = {
    orderId,
    orderAmount: amount,
    orderCurrency: "INR",
    customerName: "Customer",
    customerPhone,
    customerEmail,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "x-client-id": config.CASHFREE_APP_ID,
        "x-client-secret": config.CASHFREE_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error("Payment order creation failed: " + err.message);
  }
};
