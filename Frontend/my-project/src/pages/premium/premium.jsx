import Navbar from "../../components/layout/Navbar"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader";
import { usePremium } from "../../hooks/usePremium";

const Premium = () => {
  const { isPremium, loading, createOrder } = usePremium();

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto p-6 text-center space-y-6">
        <h1 className="text-2xl font-semibold">Premium Membership</h1>

        {loading && <Loader />}

        {isPremium ? (
          <div className="bg-green-100 text-green-700 p-4 rounded">
            🎉 You are already a Premium user!
          </div>
        ) : (
          <>
            <ul className="text-left list-disc list-inside text-gray-700 space-y-2">
              <li>Access leaderboard</li>
              <li>Unlimited expenses</li>
              <li>Priority features</li>
            </ul>

            <Button onClick={createOrder} className="w-full">
              Upgrade to Premium
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Premium;
