import express from "express";
import { createStaff, getAllStaff, assignServices } from "../controllers/staff.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { createStaffValidator, assignServiceValidator } from "../validators/staff.validator.js";

const router = express.Router();

// Admin: create staff
router.post("/", authMiddleware, roleMiddleware("admin"), createStaffValidator, createStaff);

// Get all staff
router.get("/", authMiddleware, getAllStaff);

// Assign services to staff
router.post("/:id/assign-services", authMiddleware, roleMiddleware("admin"), assignServiceValidator, assignServices);

export default router;
