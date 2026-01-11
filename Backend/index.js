import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import db from "./config/index.js";

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    // Test DB connection
    await db.sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Create/update tables in RDS based on your models
    await db.sequelize.sync({ alter: true });
    console.log("✅ All models synchronized with the database");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database init failed:", err);
    process.exit(1);
  }
})();
