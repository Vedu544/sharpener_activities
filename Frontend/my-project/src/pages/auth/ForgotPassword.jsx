// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePassword } from "../../hooks/usePassword";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  
  const { loading, requestPasswordReset } = usePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    const result = await requestPasswordReset(email);
    
    if (result.success) {
      setEmailSent(true);
      setEmail("");
    }
  };

  // Show success message after email sent
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
          <div className="text-green-500 text-5xl">✉️</div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Check Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a password reset link to your email address.
          </p>
          <p className="text-sm text-gray-500">
            (Check console for reset link during development)
          </p>
          <div className="pt-4 space-y-2">
            <button
              onClick={() => setEmailSent(false)}
              className="text-blue-600 hover:underline block w-full"
            >
              Send another link
            </button>
            <Link
              to="/login"
              className="text-gray-600 hover:underline block"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Forgot Password?
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-2">
            <Loader />
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;