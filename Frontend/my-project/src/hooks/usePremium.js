import { createOrder, verifyPayment } from "../api/premium";
import { showSuccess, showError } from "../utils/toast";
import { useAuth } from "../context/AuthContext";

export const usePremium = () => {
  const { updateUser, user } = useAuth();

  const upgradeToPremium = async () => {
    try {
      if (typeof window.Cashfree === "undefined") {
        showError("Cashfree SDK not loaded");
        return false;
      }

      const res = await createOrder();
      const { paymentSessionId, orderId } = res.data;

      const cashfree = window.Cashfree({
        mode: "sandbox",
      });

      const result = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });

      console.log("Payment result:", result);

      // ✅ After payment, verify manually (no webhook needed)
      if (!result.error) {
        showSuccess("Payment received! Verifying...");

        // Wait for Cashfree to process
        await new Promise(r => setTimeout(r, 2000));

        // Verify payment with backend
        const verifyRes = await verifyPayment({ orderId });
        console.log("Payment verification result:", verifyRes);

        // CHECK FOR STATUS 200 OR MESSAGE INSTEAD OF SUCCESS FIELD
        if (verifyRes.status === 200 || verifyRes.data.message === "Premium activated") {
          showSuccess("🎉 Premium activated!");

          // Update localStorage immediately
          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          const updatedUser = {
            ...currentUser,
            isPremium: true,
            ...(verifyRes.data.user || {})
          };
          
          console.log("Updating localStorage with:", updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Also update the context
          updateUser({ isPremium: true });

          // Reload the page to reflect changes
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          return true;
        } else {
          showError("Payment verification failed. Please contact support.");
          return false;
        }
      } else {
        showError(result.error.message || "Payment failed");
        return false;
      }

    } catch (err) {
      console.error("Error:", err);
      showError("Payment verification failed. Please refresh.");
      return false;
    }
  };

  return {
    upgradeToPremium,
    isPremium: user?.isPremium || false
  };
};