// src/pages/auth/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePassword } from "../../hooks/usePassword";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

const ResetPassword = () => {
  const { id } = useParams(); // Get request ID from URL
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidLink, setIsValidLink] = useState(null); // null = checking, true = valid, false = invalid
  const [userEmail, setUserEmail] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  
  const { loading, error, validateToken, resetPassword } = usePassword();

  // Validate the reset link when page loads
  useEffect(() => {
    const checkToken = async () => {
      const result = await validateToken(id);
      
      if (result.success) {
        setIsValidLink(true);
        setUserEmail(result.data.userEmail || "");
      } else {
        setIsValidLink(false);
      }
    };

    if (id) {
      checkToken();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    // Validate password length
    if (newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    const result = await resetPassword(id, newPassword);
    
    if (result.success) {
      setPasswordUpdated(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  // Loading state - checking if link is valid
  if (isValidLink === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <Loader />
          <p className="mt-4 text-gray-600">Validating reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid or expired link
  if (isValidLink === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
          <div className="text-red-500 text-5xl">❌</div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Invalid or Expired Link
          </h1>
          <p className="text-gray-600">
            {error || "This password reset link is no longer valid."}
          </p>
          <div className="pt-4">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Password updated successfully
  if (passwordUpdated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
          <div className="text-green-500 text-5xl">✅</div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Password Updated!
          </h1>
          <p className="text-gray-600">
            Your password has been successfully updated.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login page...
          </p>
          <div className="pt-4">
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Go to Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show password reset form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reset Password
          </h1>
          {userEmail && (
            <p className="text-gray-600 mt-2">
              For: <span className="font-medium">{userEmail}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
        </div>

        {/* Password requirements */}
        <div className="text-sm text-gray-500">
          <p>Password must:</p>
          <ul className="list-disc list-inside">
            <li className={newPassword.length >= 6 ? "text-green-600" : ""}>
              Be at least 6 characters
            </li>
            <li className={newPassword && newPassword === confirmPassword ? "text-green-600" : ""}>
              Match confirmation
            </li>
          </ul>
        </div>

        {loading ? (
          <div className="flex justify-center py-2">
            <Loader />
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Update Password
          </Button>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;