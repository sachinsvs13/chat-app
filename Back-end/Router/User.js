const express = require("express");
const router = express.Router();
const { userLogin, showAllUsers, registerUser } = require("../controller/User");

router.post("/login", userLogin);
router.post("/register", registerUser);

router.get("/", showAllUsers);

module.exports = router;
