import { useEffect, useState } from "react";
import axios from "../../api/axios"
import {usePremium} from "../../hooks/usePremium"
import Navbar from "../../components/layout/Navbar";
import Loader from "../../components/ui/Loader";
import { showError } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";

const Leaderboard = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPremium) return;

    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/leaderboard");
        setData(res.data);
      } catch (err) {
        showError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isPremium]);

  if (!isPremium) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center text-lg">
          🔒 Premium feature only
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Leaderboard
        </h1>

        {loading ? (
          <Loader />
        ) : (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-right">Total Expense</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2 text-right">
                    ₹{user.totalExpense}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Leaderboard;
