import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTY0ZGZkZjI0NGUzOWFjNzE1MjQ4MWYiLCJpYXQiOjE3NjgyMTg4MzcsImV4cCI6MTc2ODgyMzYzN30.7hhSY8JZoxf6fmtMLId-BeR1zq8c6_88Jf7fBrOYbiw",
  },
});

socket.on("connect", () => {
  console.log("Connected to socket:", socket.id);
});

socket.emit("join-room", "6964e3092a2e3a8d8b98844d");

socket.emit("send-message", {
  roomId: "6964e3092a2e3a8d8b98844d",
  content: "Hello from node client",
});
