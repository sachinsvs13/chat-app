const express = require("express");
const router = express.Router();
const {
  userLogin,
  showAllUsers,
  registerUser,
  getOtp,
  verifyOtp,
  DeleteUser,
} = require("../controller/User");

// router.post("/login", userLogin);

router.get("/", showAllUsers);

router.post("/getOtp", getOtp);

router.post("/verifyOtp", verifyOtp);

router.delete("/delete/:id", DeleteUser);

module.exports = router;
