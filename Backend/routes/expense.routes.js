import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseById,
} from "../controllers/expense.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, addExpense);
router.get("/", authenticate, getExpenses);
router.delete("/:id", authenticate, deleteExpense);

router.put("/:id", authenticate, updateExpense);
router.get("/:id", authenticate, getExpenseById);


export default router;
