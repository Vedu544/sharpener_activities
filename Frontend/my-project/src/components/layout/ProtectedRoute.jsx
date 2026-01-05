import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ premiumOnly = false }) => {
  const { user, loading, isAuthenticated, isPremium } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (premiumOnly && !isPremium) {
    return <Navigate to="/dashboard" replace />;
  }

  // Use Outlet for nested routes, not children
  return <Outlet />;
};

export default ProtectedRoute;