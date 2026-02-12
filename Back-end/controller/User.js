const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../Errors");
const User = require("../Models/User");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.userName }, token });
};

const userLogin = async (req, res) => {
  //   const { email, opt } = req.body;
  //   if (!email || !opt) {
  //     throw new BadRequestError("Please provide email and opt");
  //   }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  if (user.otp !== req.body.otp) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.userName }, token });
};

const showAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  userLogin,
  showAllUsers,
  registerUser,
};
