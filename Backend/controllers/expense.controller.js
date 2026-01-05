import { Expense } from "../models/index.js";
import { Op } from "sequelize";

export const addExpense = async (req, res, next) => {
  try {
    const { amount, description, category, note } = req.body;
    const userId = req.user.userId;

    if (!amount || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent accidental duplicate (10s window)
    const duplicate = await Expense.findOne({
      where: {
        userId,
        amount,
        description,
        category,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 10000),
        },
      },
    });

    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate expense detected",
      });
    }

    const expense = await Expense.create({
      amount,
      description,
      category,
      note,
      userId,
    });

    return res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Expense.findAndCountAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return res.status(200).json({
      expenses: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const deleted = await Expense.destroy({
      where: { id, userId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
