import Message from "../../models/Message.model.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.user._id.toString());

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(
        `👥 User ${socket.user._id} joined room ${roomId}`
      );
    });

    socket.on("send-message", async ({ roomId, content }) => {
      try {
        const message = await Message.create({
          senderId: socket.user._id,
          roomId,
          content,
        });

        const populatedMessage = await message.populate(
          "senderId",
          "name email"
        );

        io.to(roomId).emit("receive-message", populatedMessage);
      } catch (error) {
        console.error("❌ Message send error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.user._id.toString());
    });
  });
};

export default socketHandler;
