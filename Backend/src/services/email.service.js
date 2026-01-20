import SibApiV3Sdk from "sib-api-v3-sdk";
import config from "../config/env.js";

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, config.BREVO_API_KEY);

/**
 * Send transactional email
 * @param {string} to - recipient email
 * @param {string} subject
 * @param {string} htmlContent
 */
export const sendEmail = async (to, subject, htmlContent) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: config.SENDER_EMAIL, name: config.SENDER_NAME };
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    await client.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
