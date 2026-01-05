import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // MUST be first

import {app} from "./app.js";
import pgPool from "./config/db.js";

const PORT = process.env.PORT || 8000;

pgPool.query("SELECT NOW()")
  .then(() => {
    console.log("Database connected successfully");
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // DEBUG (temporary)

    app.listen(PORT, () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
