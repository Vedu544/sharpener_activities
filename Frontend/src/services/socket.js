import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

let socket;

export const connectSocket = (token) => {
  socket = io(SOCKET_URL, {
    auth: { token },
  });

  return socket;
};

export const getSocket = () => socket;
