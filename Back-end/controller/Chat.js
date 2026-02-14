const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../Errors");
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const User = require("../Models/User");

const createChat = async (req, res) => {
  const { receiverId, message } = req.body;
  if (!receiverId || !message) {
    throw new BadRequestError("Please provide receiverId and message");
  }
  const chat = await Chat.create({
    sender: req.user.userId,
    receiver: receiverId,
    message,
  });
  await Message.create({
    chatId: chat._id,
    senderId: req.user.userId,
    text: message,
  });
  res.status(StatusCodes.CREATED).json({ chat });
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