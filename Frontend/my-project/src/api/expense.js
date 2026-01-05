import api from "./axios";

/**
 * Add expense
 */
export const addExpense = (data) => {
  return api.post("/expenses", data);
};

/**
 * Get user expenses
 */
export const getExpenses = (page = 1, limit = 10) => {
  return api.get(`/expenses?page=${page}&limit=${limit}`);
};

/**
 * Delete expense
 */
export const deleteExpense = (id) => {
  return api.delete(`/expenses/${id}`);
};
