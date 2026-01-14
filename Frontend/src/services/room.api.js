import API from "./api";

/* ===== CREATE PERSONAL ROOM ===== */
export const createPersonalRoom = async (email) => {
  const res = await API.post("/rooms/personal", {
    otherUserEmail: email,
  });
  return res.data;
};

/* ===== CREATE GROUP ROOM ===== */
export const createGroupRoom = async (data) => {
  const res = await API.post("/rooms/group", data);
  return res.data;
};

/* ===== GET USER ROOMS ===== */
export const getUserRooms = async () => {
  const res = await API.get("/rooms");
  return res.data;
};
