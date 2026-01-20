import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getAllServices,
} from "../controllers/service.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { createServiceValidator, updateServiceValidator } from "../validators/service.validator.js";

const router = express.Router();

// Admin: create service
router.post("/", authMiddleware, roleMiddleware("admin"), createServiceValidator, createService);

// Admin: update service
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateServiceValidator, updateService);

// Admin: delete service
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteService);

// Get all services
router.get("/", getAllServices);

export default router;
