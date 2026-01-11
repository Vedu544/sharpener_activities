import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import sequelize from "./config/db.js";
import "./models/user.model.js";
import "./models/expense.model.js";
import "./models/order.model.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to database");

    // Force sync - will drop and recreate all tables
    await sequelize.sync({ force: true });
    console.log("✅ All tables created successfully");

    // Show what was created
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log("📋 Tables in database:", results);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
})();
