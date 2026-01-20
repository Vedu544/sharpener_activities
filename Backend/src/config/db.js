import { Sequelize } from "sequelize";
import env from "./env.js" ;

const sequelize = new Sequelize(
  env.db.database,
  env.db.username,
  env.db.password,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    logging: env.env === "development" ? console.log : false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export {
  sequelize,
  connectDB,
};
