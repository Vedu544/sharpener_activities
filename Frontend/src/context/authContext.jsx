import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/auth.api";

const AuthContext = createContext();

/* ================= PROVIDER ================= */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD USER FROM STORAGE ===== */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /* ===== LOGIN ===== */
  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);
  };

  /* ===== REGISTER ===== */
  const register = async (data) => {
    const res = await registerUser(data);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);
  };

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useAuth = () => useContext(AuthContext);
