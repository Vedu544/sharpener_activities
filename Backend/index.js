import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // MUST be first

import { app } from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Create/update tables in RDS based on your models
    // Use sync() because your RDS DB is empty
    await sequelize.sync(); // or sequelize.sync({ alter: true }) if you change models often
    console.log("✅ All models synchronized with the database");

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database init failed:", err);
    process.exit(1);
  }
})();