// config/sequelize.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,       // e.g. postgres or expense_tracker
  process.env.DB_USER,       // e.g. postgres
  process.env.DB_PASSWORD,   // your RDS password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,            // RDS requires SSL
        rejectUnauthorized: false // ok for now; for strict prod use AWS CA cert
      },
    },
  }
);

export default sequelize;