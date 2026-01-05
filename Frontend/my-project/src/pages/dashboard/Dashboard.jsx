import { useAuth } from "../../context/AuthContext";
import { useExpense } from "../../hooks/useExpense";
import { usePremium } from "../../hooks/usePremium";
import ExpenseForm from "../../components/expense/ExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import Navbar from "../../components/layout/Navbar";

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, loading, addExpense, deleteExpense } = useExpense();
  const { upgradeToPremium } = usePremium();

  const isPremium = user?.isPremium;


  
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome, {user?.name}
            </h1>
            <p className="text-sm text-gray-500">
              {isPremium ? "🌟 Premium User" : "Free User"}
            </p>
          </div>
         {!isPremium && (
        <Button onClick={upgradeToPremium}>
          Upgrade to Premium
        </Button>
      )}
        </div>

        {/* Add Expense */}
        <ExpenseForm onAdd={addExpense} />

        {/* Expenses */}
        {loading ? (
          <Loader />
        ) : (
          <ExpenseList
            expenses={expenses}
            onDelete={deleteExpense}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
