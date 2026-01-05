import api from "./axios";

/**
 * Get leaderboard (Premium only)
 */
export const getLeaderboard = () => {
  return api.get("/leaderboard");
};
