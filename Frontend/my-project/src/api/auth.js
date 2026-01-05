import api from "./axios";

/**
 * Signup
 */
export const signupUser = (data) => {
  return api.post("/auth/signup", data);
};

/**
 * Login
 */
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

/**
 * Logout
 */
export const logoutUser = () => {
  return api.post("/auth/logout");
};

/**
 * Get logged-in user
 */
export const getCurrentUser = () => {
  return api.get("/auth/me");
};
