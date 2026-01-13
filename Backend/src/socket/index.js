import { Server } from "socket.io";
import socketAuthMiddleware from "./middleware.js";
import socketHandler from "./handlers/chat.handler.js"

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // 🔐 APPLY AUTH MIDDLEWARE
  io.use(socketAuthMiddleware);

  // 👂 CONNECTION
  socketHandler(io);
};

export default initSocket;
