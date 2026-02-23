const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: [true, "otp is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60, // OTP expires after 1 minutes
  },
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is required"],
    trim: true,
    maxLength: [20, "userName cannot exceed 20 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    trim: true,
    // unique: true,
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
  otpModel: otpSchema,
});

userSchema.pre("save", async function () {
  if (this.isModified("otpModel.otp")) {
    const salt = await bcrypt.genSalt(10);
    this.otpModel.otp = await bcrypt.hash(this.otpModel.otp, salt);
  }
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

userSchema.methods.compareOTP = async function (canditateOTP) {
  const isMatch = await bcrypt.compare(canditateOTP, this.otpModel.otp);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
