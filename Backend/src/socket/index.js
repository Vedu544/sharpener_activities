import Message from "../models/Message.model.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    // Join room
    socket.on("join-room", async (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.userId} joined room ${roomId}`);
    });

    // Send message
    socket.on("send-message", async ({ roomId, content }) => {
      try {
        // Save message to DB
        const message = await Message.create({
          sender: socket.userId,
          room: roomId,
          content,
        });

        // Populate sender for frontend
        const populatedMessage = await message.populate(
          "sender",
          "name email"
        );

        // Emit message to room
        io.to(roomId).emit("receive-message", populatedMessage);
      } catch (error) {
        console.error("Message send error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.userId);
    });
  });
};

export default socketHandler;
