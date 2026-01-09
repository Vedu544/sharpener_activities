import Room from "../models/Room.model.js";
import User from "../models/User.model.js";

/* ================= CREATE PERSONAL ROOM ================= */
export const createPersonalRoom = async (req, res, next) => {
  try {
    const { otherUserEmail } = req.body;
    const loggedInUserId = req.user._id;

    if (!otherUserEmail) {
      return res.status(400).json({
        success: false,
        message: "Other user email is required",
      });
    }

    const otherUser = await User.findOne({ email: otherUserEmail });

    if (!otherUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if room already exists
    const existingRoom = await Room.findOne({
      roomType: "personal",
      members: { $all: [loggedInUserId, otherUser._id] },
    });

    if (existingRoom) {
      return res.status(200).json({
        success: true,
        room: existingRoom,
      });
    }

    const room = await Room.create({
      roomType: "personal",
      members: [loggedInUserId, otherUser._id],
    });

    return res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= CREATE GROUP ROOM ================= */
export const createGroupRoom = async (req, res, next) => {
  try {
    const { groupName, members } = req.body;
    const loggedInUserId = req.user._id;

    if (!groupName || !members || members.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Group name and at least 2 members are required",
      });
    }

    const uniqueMembers = Array.from(
      new Set([...members, loggedInUserId.toString()])
    );

    const room = await Room.create({
      roomType: "group",
      groupName,
      members: uniqueMembers,
      createdBy: loggedInUserId,
    });

    return res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET USER ROOMS ================= */
export const getUserRooms = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({
      members: userId,
    })
      .populate("members", "name email")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
