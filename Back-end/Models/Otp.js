const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    expires: 60, // OTP expires after 10 minutes
  },
});

otpSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
}

otpSchema.methods.compareOTP = async function (canditateOTP) {
  const isMatch = await bcrypt.compare(canditateOTP, this.otp);
  return isMatch;
};
module.exports = mongoose.model("OTP", otpSchema);
