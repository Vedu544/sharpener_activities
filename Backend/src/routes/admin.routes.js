import express from "express";
import { getAllUsers, manageAppointments } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin: get all users
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);

// Admin: manage appointments
router.get("/appointments", authMiddleware, roleMiddleware("admin"), manageAppointments);

export default router;
