import db from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 */
export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await db.User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate tokens
  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  return { user, accessToken, refreshToken };
};

/**
 * Login user
 * @param {Object} loginData - { email, password }
 */
export const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Find user
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  // Compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Generate tokens
  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  return { user, accessToken, refreshToken };
};

/**
 * Refresh Access Token
 * @param {string} token - Refresh token
 */
export const refreshTokenUser = async (token) => {
  if (!token) throw new Error("Refresh token missing");

  // Verify refresh token
  const payload = verifyRefreshToken(token);

  // Generate new access token
  const accessToken = generateAccessToken({ id: payload.id, role: payload.role });

  return { accessToken };
};
