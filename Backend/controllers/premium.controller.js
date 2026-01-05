
import { Order, User} from "../config/index.js"
import { v4 as uuidv4 } from "uuid";
import cashfree from "../config/cashfree.js"

/**
 * CREATE PREMIUM ORDER
 */
export const createPremiumOrder = async (req, res) => {
  try {
    const user = req.user;
    const orderId = `order_${uuidv4()}`;
    const amount = 999;

    await Order.create({
      orderId,
      amount,
      status: "PENDING",
      userId: user.userId,
    });

    // premium.controller.js - Remove notify_url
const orderData = {
  order_id: orderId,
  order_amount: amount,
  order_currency: "INR",
  customer_details: {
    customer_id: String(user.userId),
    customer_name: user.name || "User",
    customer_email: user.email,
    customer_phone: "9876543210",
  },
  order_meta: {
    return_url: "http://localhost:5173/dashboard?order_id={order_id}",
    // ❌ Remove notify_url for now
  },
};

    const response = await cashfree.PGCreateOrder(orderData);
    
    console.log("Cashfree order created:", response.data);

    return res.status(201).json({
      orderId: response.data.order_id,
      paymentSessionId: response.data.payment_session_id,
      cfOrderId: response.data.cf_order_id,
      orderStatus: response.data.order_status,
    });

  } catch (error) {
    console.error("Create Order Error:", error?.response?.data || error);
    res.status(500).json({ 
      message: error?.response?.data?.message || error.message || "Failed to create order" 
    });
  }
};

/**
 * VERIFY PAYMENT
 */
export const verifyPremiumPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const response = await cashfree.PGFetchOrder(orderId);
    console.log("Order status:", response.data.order_status);

    if (response.data.order_status === "PAID") {
      order.status = "SUCCESS";
      await order.save();

      await User.update(
        { isPremium: true },
        { where: { id: order.userId } }
      );

      return res.json({ message: "Premium activated" });
    }

    return res.status(400).json({
      error: `Payment not successful. Status: ${response.data.order_status}`,
    });
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ error: error.message || "Verification failed" });
  }
};


export const premiumWebhook = async (req, res) => {
  try {
    const event = req.body;

    const orderId = event?.data?.order?.order_id;
    const status = event?.data?.order?.order_status;

    console.log("Webhook received:", orderId, status);

    if (!orderId) {
      return res.status(400).json({ message: "Order ID missing" });
    }

    const order = await Order.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "PAID") {
      order.status = "SUCCESS";
      await order.save();

      await User.update(
        { isPremium: true },
        { where: { id: order.userId } }
      );
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Webhook failed" });
  }
};

