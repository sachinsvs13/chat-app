const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide sender"],
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide receiver"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
      trim: true,
    },
  },
  { timestamps: true },
);
