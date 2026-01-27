import { models as db } from "../models/index.js";


const { User } = db;

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await user.update(updateData);

  return user;
};
