import { useState } from "react";
import axios from "../../api/axios";
import { showError, showSuccess } from "../../utils/toast";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.description) {
      return showError("Amount and description are required");
    }

    try {
      setLoading(true);

      await axios.post("/expenses", {
        amount: form.amount,
        description: form.description,
        category: form.category,
        note: form.note,
      });

      showSuccess("Expense added");

      setForm({
        amount: "",
        description: "",
        category: "Food",
        note: "",
      });

      onExpenseAdded?.();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Expense</h2>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>

      <input
        type="text"
        name="note"
        placeholder="Note (optional)"
        value={form.note}
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
