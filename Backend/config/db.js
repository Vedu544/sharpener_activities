import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false, // true only in dev
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Sequelize connection failed:", error.message);
  }
})();

export default sequelize;
