const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      trim: true,
      maxLength: [20, "userName cannot exceed 20 characters"],
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
      trim: true,
      maxLength: [15, "phone cannot exceed 15 characters"],
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
  },
  { timestamps: true },
);
