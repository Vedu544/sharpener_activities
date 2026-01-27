import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";


import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

/* ===============================
   Global Middlewares
================================ */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorMiddleware);



/* ===============================
   Health Check Route
================================ */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Salon Booking API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/services", serviceRoutes);
app.use("/staff", staffRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/payments", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/admin", adminRoutes);


export default app;
