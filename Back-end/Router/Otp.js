const express = require("express");
const router = express.Router();
const { showOtp, getOtp, showAllOtp, deleteOtp } = require("../controller/Otp");

router.post("/getOtp", getOtp);

router.get("/", showAllOtp);

router.get("/singleOtp/:email", showOtp);

router.delete("/:id", deleteOtp);

module.exports = router;
