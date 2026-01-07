import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import premiumRoutes from "./routes/premium.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import passwordRoutes from "./routes/password.routes.js";

const app = express();

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",          // local dev
  process.env.FRONTEND_URL,         // S3 static website URL from .env
].filter(Boolean);                  // remove undefined / empty values

console.log("CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (Postman, curl) with no Origin header
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/premium", premiumRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/password", passwordRoutes);

export { app };