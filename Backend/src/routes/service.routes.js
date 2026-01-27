import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getAllServices,
} from "../controllers/service.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createServiceValidator, updateServiceValidator } from "../validators/service.validator.js";

const router = express.Router();

// Admin: create service
router.post("/create", authMiddleware, roleMiddleware("ADMIN"), createServiceValidator, createService);

// Admin: update service
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), updateServiceValidator, updateService);

// Admin: delete service
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteService);

// Get all services
router.get("/", getAllServices);

export default router;
