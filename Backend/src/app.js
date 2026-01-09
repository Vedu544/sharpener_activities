import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/auth.routes.js"
import roomRoutes from "../src/routes/room.routes.js"
import messageRoutes from "../src/routes/message.routes.js"

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- HEALTH CHECK ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy 🚀",
  });
});

/* ---------- ROUTES (will add later) ---------- */
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/rooms", roomRoutes);

/* ---------- GLOBAL ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
