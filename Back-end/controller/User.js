const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} = require("../Errors");
const User = require("../Models/User");
const Chat = require("../Models/Chat");
const Otp = require("../Models/Otp");

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new BadRequestError("Please provide email and otp");
  }

  const validOtp = await Otp.findOne({ email, otp });
  if (!validOtp) {
    throw new UnAuthenticatedError("Invalid OTP");
  }
  // const isOtpValid = await validOtp.compareOTP(otp);
  // if (!isOtpValid) {
  //   throw new UnAuthenticatedError("Invalid OTP");
  // }

  // const user = new User({
  //   userName: req.body.userName,
  //   email,
  //   otpModel: { otp },
  //   avatar: req.file,
  // });
  // await user.save();

  const user = await User.create({ ...req.body });
  if (!user) {
    throw new UnAuthenticatedError("User not found");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUserOtp = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findByIdAndUpdate(
    {
      _id: userID,
    },
    req.body,
    { new: true, runValidators: true },
  );
  res.status(StatusCodes.OK).json(user);
};

const userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new BadRequestError("Please provide email and otp");
  }

  const isOtpCorrect = await user.comparePassword(otp);
  if (!isOtpCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("User not found");
  }
  const validOtp = await otp.findOne({ email, otp });
  if (!validOtp) {
    throw new UnAuthenticatedError("Invalid OTP");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const DeleteUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOneAndDelete({ _id: userID });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  await Chat.deleteMany({ sender: user._id });

  // await Chat.deleteMany({ receiver: user._id });
  // await Message.deleteMany({ senderId: user._id });

  res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};

//Development Uses
const showAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  verifyOtp,
  DeleteUser,
  userLogin,
  showAllUsers,
  updateUserOtp,
};
