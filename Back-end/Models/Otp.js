const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
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
    otp: {
    type: String,
    trim: true,
  },
    createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // OTP expires after 10 minutes
  },
});

module.exports = mongoose.model("OTP", otpSchema);
