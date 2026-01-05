"use client";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isPremium, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ---------- LEFT ---------- */}
        <Link to="/dashboard" className="text-lg font-semibold">
          Expense<span className="text-blue-600">Tracker</span>
        </Link>

        {/* ---------- RIGHT ---------- */}
        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <>
             

              {isPremium && (
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                    `text-sm ${
                      isActive
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`
                  }
                >
                  Leaderboard
                </NavLink>
              )}

              {!isPremium && (
                <NavLink
                  to="/premium"
                  className="text-sm text-yellow-600 font-medium"
                >
                  Go Premium ⭐
                </NavLink>
              )}

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </Button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className="text-sm text-gray-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="text-sm text-blue-600 font-medium"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
