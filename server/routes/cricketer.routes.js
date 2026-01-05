import express from "express";

const router = express.Router();
import {
  createCricketer,
  getCricketers,
  getCricketerById,
  updateCricketer,
  deleteCricketer
} from "../controllers/cricketer.controller.js";

router.post("/cricketers", createCricketer);
router.get("/cricketers", getCricketers);
router.get("/cricketers/:id", getCricketerById);
router.put("/cricketers/:id", updateCricketer);
router.delete("/cricketers/:id", deleteCricketer);

export default router;
