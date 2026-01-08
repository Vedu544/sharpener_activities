import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "./.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, '../global-bundle.pem')).toString()
      }
    }
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
