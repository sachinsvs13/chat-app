const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
      required: [true, "Please provide chatId"],
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide senderId"],
    },
    text: {
      type: String,
      required: [true, "Please provide text"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true },
);
