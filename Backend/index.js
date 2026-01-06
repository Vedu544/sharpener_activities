import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // MUST be first

import { app } from "./app.js";
import pgPool from "./config/db.js";

const PORT = process.env.PORT || 8000;

pgPool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Database connected successfully");
    // REMOVE this in production:
    // console.log("JWT_SECRET:", process.env.JWT_SECRET);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // optional but good practice
  });
