const chatHandler = (io, socket) => {
  /* ---------- JOIN ROOM ---------- */
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(
      `User ${socket.user.email} joined room ${roomId}`
    );
  });

  /* ---------- LEAVE ROOM ---------- */
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(
      `User ${socket.user.email} left room ${roomId}`
    );
  });

  /* ---------- SEND MESSAGE ---------- */
  socket.on("send_message", (data) => {
    const { roomId, content } = data;

    const messagePayload = {
      roomId,
      sender: {
        id: socket.user._id,
        name: socket.user.name,
        email: socket.user.email,
      },
      content,
      createdAt: new Date(),
    };

    io.to(roomId).emit("new_message", messagePayload);
  });
};

export default chatHandler;
