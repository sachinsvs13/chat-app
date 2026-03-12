const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} = require("../Errors");
const User = require("../Models/User");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Chat = require("../Models/Chat");
const Otp = require("../Models/Otp");
const { model } = require("mongoose");

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
  const otp = await Otp.create({ email, otp: generateOTP() });

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
  res.status(StatusCodes.CREATED).json({ otp });
};

const showAllOtp = async (req, res) => {
  const otp = await Otp.find({});
  res.status(StatusCodes.OK).json({ otp });
};

const showOtp = async (req, res) => {
  const { email } = req.params;
  const otp = await Otp.findOne({ email });
  if (!otp) {
    throw new NotFoundError("No Item Found");
  }
  res.status(StatusCodes.OK).json({ otp });
};

const deleteOtp = async (req, res) => {
  const otp = await Otp.findOneAndDelete({ _id: req.params.id });
  if (!otp) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  res.status(StatusCodes.OK).json({ msg: "OTP deleted successfully" });
};

module.exports = {
  getOtp,
  showOtp,
  showAllOtp,
  deleteOtp,
};
