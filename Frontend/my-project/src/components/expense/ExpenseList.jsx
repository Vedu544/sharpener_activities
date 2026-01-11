import { useState, useMemo } from "react";
import { showSuccess, showError } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";

const ITEMS_PER_PAGE = 7;

const ExpenseList = ({ expenses, onRefresh, onDelete, onUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    category: "",
    amount: "",
  });
  const { user } = useAuth();
  const isPremium = user?.isPremium;

  // Get unique categories from expenses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(expenses.map((exp) => exp.category))];
    return uniqueCategories.filter(Boolean);
  }, [expenses]);

  // Filter and sort expenses
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (expense) =>
          expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((expense) => expense.category === categoryFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        case "a-z":
          return (a.description || "").localeCompare(b.description || "");
        case "z-a":
          return (b.description || "").localeCompare(a.description || "");
        default:
          return 0;
      }
    });

    return result;
  }, [expenses, searchTerm, categoryFilter, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortBy]);

  // Start editing an expense
  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      description: expense.description,
      category: expense.category,
      amount: expense.amount.toString(),
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ description: "", category: "", amount: "" });
  };

  // Save updated expense
  const handleSaveEdit = async (id) => {
    try {
      // Validate
      if (!editForm.description.trim() || !editForm.category.trim() || !editForm.amount) {
        showError("All fields are required");
        return;
      }

      const amount = parseFloat(editForm.amount);
      if (isNaN(amount) || amount <= 0) {
        showError("Please enter a valid amount");
        return;
      }

      if (onUpdate) {
        await onUpdate(id, {
          description: editForm.description.trim(),
          category: editForm.category.trim(),
          amount: amount,
        });
        setEditingId(null);
        setEditForm({ description: "", category: "", amount: "" });
      }
    } catch (err) {
      showError("Failed to update expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (onDelete) {
        await onDelete(id);
      }
    } catch (err) {
      showError("Failed to delete expense");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm || categoryFilter !== "all" || sortBy !== "newest";

  // Download expense report as CSV
  const downloadExpenseReport = () => {
    if (!isPremium) {
      showError("This feature is only available for premium users");
      return;
    }

    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Calculate total amount
    const totalAmount = sortedExpenses.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0
    );

    // Create CSV content with proper formatting
    let csvContent = "\uFEFF"; // BOM for Excel to recognize UTF-8

    // Title
    csvContent += "Day to Day Expense Report\n";
    csvContent += `Generated on: ${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}\n`;
    csvContent += `Total Expenses: Rs. ${totalAmount}\n`;
    csvContent += "\n";

    // Table headers
    csvContent += "S.No.,Date,Description,Category,Amount (Rs.)\n";

    // Table rows
    sortedExpenses.forEach((expense, index) => {
      const date = new Date(expense.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const description = `"${(expense.description || "N/A").replace(/"/g, '""')}"`;
      const category = `"${(expense.category || "N/A").replace(/"/g, '""')}"`;
      const amount = Number(expense.amount);

      csvContent += `${index + 1},${date},${description},${category},${amount}\n`;
    });

    // Add total row
    csvContent += `\n,,,Total:,${totalAmount}\n`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `expense-report-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess("Expense report downloaded successfully!");
  };

  // Download as formatted text file
  const downloadExpenseReportTxt = () => {
    if (!isPremium) {
      showError("This feature is only available for premium users");
      return;
    }

    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Calculate total amount
    const totalAmount = sortedExpenses.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0
    );

    // Create formatted text content
    let content = "";

    // Title with decorative border
    content += "═".repeat(70) + "\n";
    content += "                      DAY TO DAY EXPENSE REPORT\n";
    content += "═".repeat(70) + "\n\n";

    content += `Generated on: ${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}\n`;
    content += `Total Expenses: ₹${totalAmount.toLocaleString("en-IN")}\n`;
    content += `Number of Transactions: ${sortedExpenses.length}\n\n`;

    content += "─".repeat(70) + "\n";

    // Table header
    content += `${"S.No".padEnd(8)}${"Date".padEnd(15)}${"Description".padEnd(25)}${"Category".padEnd(15)}${"Amount".padStart(10)}\n`;
    content += "─".repeat(70) + "\n";

    // Table rows
    sortedExpenses.forEach((expense, index) => {
      const date = new Date(expense.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const description = (expense.description || "N/A").substring(0, 22).padEnd(25);
      const category = (expense.category || "N/A").substring(0, 12).padEnd(15);
      const amount = `₹${Number(expense.amount).toLocaleString("en-IN")}`.padStart(10);

      content += `${String(index + 1).padEnd(8)}${date.padEnd(15)}${description}${category}${amount}\n`;
    });

    content += "─".repeat(70) + "\n";
    content += `${"".padEnd(48)}${"TOTAL:".padEnd(15)}₹${totalAmount.toLocaleString("en-IN").padStart(7)}\n`;
    content += "═".repeat(70) + "\n";

    // Create blob and download
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `expense-report-${new Date().toISOString().split("T")[0]}.txt`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess("Expense report downloaded successfully!");
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis2");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (!expenses.length) {
    return (
      <p className="text-center text-gray-500 mt-4">No expenses added yet</p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Header with Download Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Expenses</h2>

        {/* Download Button - Only for Premium Users */}
        {isPremium ? (
          <div className="flex gap-2">
            <button
              onClick={downloadExpenseReport}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-medium shadow-md hover:shadow-lg transition-all"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CSV
            </button>
            <button
              onClick={downloadExpenseReportTxt}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 font-medium shadow-md hover:shadow-lg transition-all"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download TXT
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg border border-dashed border-gray-300">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-sm">Download Report</span>
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
              Premium
            </span>
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by description or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-gray-500">
          Showing {filteredExpenses.length === 0 ? 0 : startIndex + 1} -{" "}
          {Math.min(endIndex, filteredExpenses.length)} of{" "}
          {filteredExpenses.length} expenses
          {hasActiveFilters && (
            <span className="text-blue-600"> (filtered from {expenses.length} total)</span>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {filteredExpenses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No expenses match your filters</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentExpenses.map((expense, index) => (
                    <tr
                      key={expense.id}
                      className={`border-b hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {editingId === expense.id ? (
                        // EDIT MODE
                        <>
                          <td className="p-3">
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({ ...editForm, description: e.target.value })
                              }
                              className="w-full px-2 py-1 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="Description"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={editForm.category}
                              onChange={(e) =>
                                setEditForm({ ...editForm, category: e.target.value })
                              }
                              className="w-full px-2 py-1 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
                              placeholder="Category"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              step="0.01"
                              value={editForm.amount}
                              onChange={(e) =>
                                setEditForm({ ...editForm, amount: e.target.value })
                              }
                              className="w-full px-2 py-1 border border-blue-500 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center"
                              placeholder="Amount"
                            />
                          </td>
                          <td className="p-3 text-center text-gray-500">
                            {new Date(expense.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleSaveEdit(expense.id)}
                                className="inline-flex items-center gap-1 px-3 py-1 text-green-600 hover:text-white hover:bg-green-500 rounded-lg font-medium transition-all"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="inline-flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-white hover:bg-gray-500 rounded-lg font-medium transition-all"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // VIEW MODE
                        <>
                          <td className="p-3 font-medium text-gray-800">
                            {expense.description}
                          </td>
                          <td className="p-3 text-center">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {expense.category}
                            </span>
                          </td>
                          <td className="p-3 text-center font-semibold text-green-600">
                            ₹{Number(expense.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="p-3 text-center text-gray-500">
                            {new Date(expense.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditClick(expense)}
                                className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-white hover:bg-blue-500 rounded-lg font-medium transition-all"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(expense.id)}
                                className="inline-flex items-center gap-1 px-3 py-1 text-red-600 hover:text-white hover:bg-red-500 rounded-lg font-medium transition-all"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <span key={index}>
                        {page === "ellipsis" || page === "ellipsis2" ? (
                          <span className="px-3 py-2 text-gray-500">...</span>
                        ) : (
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all ${
                              currentPage === page
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-2 text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;