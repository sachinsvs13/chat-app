const express = require("express");
const router = express.Router();
const {createMessage} = require('../controller/Message')

router.get("/", createMessage)

module.exports = router