import { createOrder, verifyPayment } from "../api/premium";
import { showSuccess, showError } from "../utils/toast";
import useAuth from "./useAuth";

export const usePremium = () => {
  const { refetchUser } = useAuth();

  const upgradeToPremium = async () => {
    try {
      if (typeof window.Cashfree === "undefined") {
        showError("Cashfree SDK not loaded");
        return;
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
        
        if (verifyRes.data.success) {
          showSuccess("🎉 Premium activated!");
          await refetchUser();
        }
      } else {
        showError(result.error.message || "Payment failed");
      }

    } catch (err) {
      console.error("Error:", err);
      showError("Payment verification failed. Please refresh.");
    }
  };

  return { upgradeToPremium };
};