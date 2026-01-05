import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import premiumRoutes from "./routes/premium.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import passwordRoutes from "./routes/password.routes.js";

const app = express();

// test route (VERY IMPORTANT)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}));

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());


// routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/premium", premiumRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/password", passwordRoutes);

export { app };
