// src/services/email.service.js
import SibApiV3Sdk from "sib-api-v3-sdk";

// Configure API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send password reset email
 */
export const sendResetPasswordEmail = async (toEmail, resetLink) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "🔐 Reset Your Password - Expense Tracker";
    
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .button:hover { background: #4338CA; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .link { word-break: break-all; color: #4F46E5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password for your Expense Tracker account.</p>
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link in your browser:</p>
            <p class="link">${resetLink}</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            
            <p><strong>⚠️ Important:</strong></p>
            <ul>
              <li>This link will expire after 1 hour</li>
              <li>This link can only be used once</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
          </div>
          <div class="footer">
            <p>© 2024 Expense Tracker. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    sendSmtpEmail.sender = {
      name: process.env.SENDER_NAME || "Expense Tracker",
      email: process.env.SENDER_EMAIL,
    };

    sendSmtpEmail.to = [{ email: toEmail }];

    console.log("📧 Sending email to:", toEmail);
    
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log("✅ Email sent successfully!");
    console.log("📬 Message ID:", response.messageId);
    
    return { success: true, messageId: response.messageId };
    
  } catch (error) {
    console.error("❌ Email sending failed!");
    console.error("Error:", error.message);
    
    if (error.response) {
      console.error("Response body:", error.response.body);
    }
    
    return { success: false, error: error.message };
  }
};