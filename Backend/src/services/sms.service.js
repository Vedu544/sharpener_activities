import axios from "axios";
import config from "../config/env.js";

/**
 * Send SMS
 * @param {string} to - recipient phone
 * @param {string} message
 */
export const sendSMS = async (to, message) => {
  try {
    // Example: Brevo SMS API
    await axios.post(
      "https://api.brevo.com/v3/sms/send",
      {
        sender: "SALON",
        recipient: to,
        content: message,
      },
      {
        headers: {
          "api-key": config.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("SMS sending error:", err.message);
  }
};
