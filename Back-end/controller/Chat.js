const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../Errors");
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const User = require("../Models/User");

const createChat = async (req, res) => {
  const { receiver  } = req.body;
  if (!receiver ) {
    throw new BadRequestError("Please provide receiver");
  }
  const chat = await Chat.create({
    sender: req.user.userId,
    receiver: receiver,
  });
  // await Message.create({
  //   chatId: chat._id,
  //   senderId: req.user.userId,
  // });
  res.status(StatusCodes.CREATED).json({ chat });
  console.log(req.user);
  
};

const getChats = async (req, res) => {
  const chats = await Chat.find({
    $or: [{ sender: req.user.userId }, { receiver: req.user.userId }],
    })
    .populate("sender", "email avatar")
    .populate("receiver", "email avatar")
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ chats });
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId })
    .populate("senderId", "email avatar")
    .sort({ createdAt: 1 });
  res.status(StatusCodes.OK).json({ messages });
};

module.exports = {
  createChat,
  getChats,
  getMessages,
};