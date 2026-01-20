import "dotenv/config";

export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,

  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  email: {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.SENDER_EMAIL,
    senderName: process.env.SENDER_NAME,
  },

  cashfree: {
    appId: process.env.CASHFREE_APP_ID,
    secretKey: process.env.CASHFREE_SECRET_KEY,
    env: process.env.CASHFREE_ENV,
  },

  frontendUrl: process.env.FRONTEND_URL,

  salon: {
    name: process.env.SALON_NAME,
    email: process.env.SALON_EMAIL,
    phone: process.env.SALON_PHONE,
    address: process.env.SALON_ADDRESS,
  },
};
