import express from "express";
import { getAllUsers, manageAppointments } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin: get all users
router.get("/users", authMiddleware, roleMiddleware("ADMIN"), getAllUsers);

// Admin: manage appointments
router.get("/appointments", authMiddleware, roleMiddleware("ADMIN"), manageAppointments);

export default router;
