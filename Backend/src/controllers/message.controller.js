import Message from "../models/Message.model.js";
import Room from "../models/Room.model.js";

/* ================= SEND MESSAGE ================= */
export const sendMessage = async (req, res, next) => {
  try {
    const { roomId, content, messageType } = req.body;
    const senderId = req.user._id;

    if (!roomId || !content) {
      return res.status(400).json({
        success: false,
        message: "Room ID and content are required",
      });
    }

    const room = await Room.findById(roomId);

    if (
      !room ||
      !room.members.some(
        (memberId) => memberId.toString() === senderId.toString()
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this room",
      });
    }

    const message = await Message.create({
      roomId,
      senderId,
      content,
      messageType: messageType || "text",
    });

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET MESSAGES ================= */
export const getMessagesByRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const userId = req.user._id;

    const room = await Room.findById(roomId);

    if (
      !room ||
      !room.members.some(
        (memberId) => memberId.toString() === userId.toString()
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const messages = await Message.find({ roomId })
      .populate("senderId", "name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};
