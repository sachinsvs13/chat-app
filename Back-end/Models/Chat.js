const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide sender"],
    },
    receiver: {
      type: String,
      required: [true, "Please provide receiver"],
    },
  },
  { timestamps: true },
);

chatSchema.methods.createJWT = function () {
  jwt.sign(
    {
      senderID: this.sender._id,
      receiverID: this.receiver._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

module.exports = mongoose.model("Chat", chatSchema);
