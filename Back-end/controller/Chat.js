const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../Errors");
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const User = require("../Models/User");

const createChat = async (req, res) => {

  const {
    user: { userId },
    body : { name },
  } = req;

  const receiver = await User.findOne({ userName: name });
  if (!receiver) {
    throw new BadRequestError("Please provide receiver");
  }
  const chat = await Chat.create({
    sender: userId,
    receiver: receiver._id,
  });
  // await Message.create({
  //   chatId: chat._id,
  //   senderId: req.user.userId,
  // });
  res.status(StatusCodes.CREATED).json({ chat });
};

const getChats = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const chats = await Chat.find({ sender: userId })
    .populate("sender", "email avatar")
    .populate("receiver", "email avatar")
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ chats });
};

const getSingleChat = async (req,res) => {
  const {
    user : {userId},
    params: { id : chatId },
  } = req;
  const chat = await Chat.findById({ _id: chatId, sender: userId })
    .populate("sender", "email avatar")
    .populate("receiver", "email avatar");
  if (!chat) {
    throw new BadRequestError("Chat not found");
  }
  res.status(StatusCodes.OK).json({ chat });
}

const deleteChat = async (req, res) => {
  const {
    user: { userId },
    params: { chatId },
  } = req;
  const chat = await Chat.findOneAndDelete({
    _id: chatId,
    sender: userId,
  });
  if (!chat) {
    throw new UnAuthenticatedError("You are not authorized to delete this chat");
  }
  res.status(StatusCodes.OK).json({ msg: "Chat deleted successfully" });
}

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
  deleteChat,
  getSingleChat
};
