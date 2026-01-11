import { useState, useEffect } from "react";
import { 
  getExpenses, 
  addExpense, 
  deleteExpense, 
  updateExpense as updateExpenseAPI, 
  getExpenseById as getExpenseByIdAPI 
} from "../api/expense";
import { showSuccess, showError } from "../utils/toast";

export const useExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      setExpenses(res.data.expenses || []);
    } catch (error) {
      showError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  // Add new expense
  const createExpense = async (expenseData) => {
    try {
      setLoading(true);
      const res = await addExpense(expenseData);
      setExpenses((prev) => [res.data.expense, ...prev]);
      showSuccess("Expense added successfully");
    } catch (error) {
      showError(error.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  // Update existing expense
  const modifyExpense = async (id, expenseData) => {
    try {
      setLoading(true);
      const res = await updateExpenseAPI(id, expenseData);
      setExpenses((prev) => 
        prev.map((e) => e.id === id ? res.data.expense : e)
      );
      showSuccess("Expense updated successfully");
      return res.data.expense;
    } catch (error) {
      showError(error.response?.data?.message || "Failed to update expense");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get expense by ID
  const fetchExpenseById = async (id) => {
    try {
      setLoading(true);
      const res = await getExpenseByIdAPI(id);
      return res.data.expense;
    } catch (error) {
      showError("Failed to fetch expense");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete expense
  const removeExpense = async (id) => {
    try {
      setLoading(true);
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      showSuccess("Expense deleted");
    } catch (error) {
      showError("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    fetchExpenses,
    createExpense,
    modifyExpense,
    fetchExpenseById,
    removeExpense,
  };
};