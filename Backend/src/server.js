import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

/* ---------- ENV CONFIG ---------- */
dotenv.config();

const PORT = process.env.PORT || 3000;

/* ---------- START SERVER ---------- */
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
