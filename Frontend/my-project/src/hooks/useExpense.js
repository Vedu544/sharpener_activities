import { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "../api/expense";
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
      setExpenses((prev) => [...prev, res.data.expense]);
      showSuccess("Expense added successfully", "success");
    } catch (error) {
      showError("Failed to add expense", "error");
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
      showSuccess("Expense deleted", "success");
    } catch (error) {
      showError("Failed to delete expense", "error");
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
    removeExpense,
  };
};


