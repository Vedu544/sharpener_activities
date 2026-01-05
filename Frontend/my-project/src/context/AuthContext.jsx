"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";
import {
  loginUser,
  signupUser,
  logoutUser,
} from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- INITIAL AUTH CHECK (from localStorage) ---------------- */
  const fetchUser = () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      // If JSON parsing fails, clear everything
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = async (data) => {
    try {
      const res = await loginUser(data);

      if (!res.data.token && !res.data.userId) {
        console.error("Invalid login credentials");
      }

      // Create user object from response
      const userData = {
        id: res.data.userId,
        name: res.data.name,
        email: res.data.email,
        isPremium: res.data.isPremium,
      };

      // Store in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setUser(userData);

      showSuccess("Login successful");
     navigate("/dashboard");
    } catch (error) {
      showError(error?.response?.data?.message || "Login failed");
      throw error;
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const signup = async (data) => {
    try {
      await signupUser(data);
      showSuccess("Account created successfully. Please login.");
      navigate("/login");
    } catch (error) {
      showError(error?.response?.data?.message || "Signup failed");
      throw error;
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // ignore
    } finally {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      setUser(null);
      navigate("/login");
    }
  };

  /* ---------------- UPDATE USER (for premium upgrade, etc.) ---------------- */
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPremium: user?.isPremium || false,
        loading,
        login,
        signup,
        logout,
        updateUser,
        refetchUser: fetchUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* ---------------- CUSTOM HOOK ---------------- */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};