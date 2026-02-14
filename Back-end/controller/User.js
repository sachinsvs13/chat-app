const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../Errors");
const User = require("../Models/User");
const OTP = require("../Models/Otp");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

const app = express();
app.use(bodyParser.json());

const getOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = await OTP.create({ email, otp: generateOTP() });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Chat App Login",
    text: `Your OTP for Chat App login is: ${generateOTP()}. Please Do Not Share This OTP With Anyone. This OTP will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("OTP sent to your email");
    }
  });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { email: otp.email, otp: otp.otp } });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new BadRequestError("Please provide email and otp");
  }
  const validOtp = await OTP.findOne({ email, otp });
  if (!validOtp) {
    throw new UnAuthenticatedError("Invalid OTP");
  }
  const user = await User.create({ ...req.body });
  if (!user) {
    throw new UnAuthenticatedError("User not found");
  }
  res.status(StatusCodes.OK).json({ user });
};

const showAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getOtp,
  verifyOtp,
  showAllUsers,
};
