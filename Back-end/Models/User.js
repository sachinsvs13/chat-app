const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is required"],
    trim: true,
    maxLength: [20, "userName cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: [true, "avatar is required"],
    trim: true,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: [true, "otp is required"],
    trim: true,
  },
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.userName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

module.exports = mongoose.model("User", userSchema);
