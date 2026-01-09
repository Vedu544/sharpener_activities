import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomType: {
      type: String,
      enum: ["personal", "group"],
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    groupName: {
      type: String,
      trim: true,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
