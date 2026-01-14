import API from "./api";

/* ===== SEND MESSAGE ===== */
export const sendMessage = async (data) => {
  const res = await API.post("/messages", data);
  return res.data;
};

/* ===== GET ROOM MESSAGES ===== */
export const getRoomMessages = async (roomId) => {
  const res = await API.get(`/messages/${roomId}`);
  return res.data;
};
