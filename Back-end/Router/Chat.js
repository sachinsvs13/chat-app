const express = require("express");
const router = express.Router();
const {
  createChat,
  getChats,
  getMessages,
  deleteChat,
  getSingleChat,
} = require("../controller/Chat");

router.post("/", createChat);
router.get("/getChats", getChats);
router.get("/:chatId/messages", getMessages);
router.delete("/:chatId", deleteChat);
router.get("/:ChatId", getSingleChat);

module.exports = router;
