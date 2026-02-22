const express = require("express");
const router = express.Router();
const { createChat, getChats, getMessages } = require("../controller/Chat");

router.post("/", createChat);
router.get("/getChats", getChats);
router.get("/:chatId/messages", getMessages);

module.exports = router;