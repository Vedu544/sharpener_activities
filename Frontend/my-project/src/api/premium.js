import api from "./axios";

/**
 * Create premium order
 */
export const createOrder = () => {
  return api.post("/premium/create-order");
};

/**
 * Verify premium payment
 */
export const verifyPayment = (data) => {
  return api.post("/premium/verify", data); // expects { orderId }
};
