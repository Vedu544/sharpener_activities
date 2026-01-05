import axios from "../../api/axios";
//import { formatCurrency, formatDate } from "../../utils/format";
import { showSuccess, showError } from "../../utils/toast";

const ExpenseList = ({ expenses, onRefresh }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      showSuccess("Expense deleted");
      onRefresh?.();
    } catch (err) {
      showError("Failed to delete expense");
    }
  };

  if (!expenses.length) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No expenses added yet
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mt-6">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="p-3 text-left">Description</th>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b">
              <td className="p-3">{expense.description}</td>
              <td className="p-3 text-center">{expense.category}</td>
              <td className="p-3 text-center">
                {(expense.amount)}
              </td>
              <td className="p-3 text-center">
                {(expense.createdAt)}
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
