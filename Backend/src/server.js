import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import initSocket from "./socket/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  initSocket(server); // 👈 attach socket

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
