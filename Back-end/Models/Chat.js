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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
