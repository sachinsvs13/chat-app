const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  userLogin,
  showAllUsers,
  verifyOtp,
  DeleteUser,
  updateUserOtp,
} = require("../controller/User");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb("JPEG, PNG and JPG only supported", false);
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", showAllUsers);

router.post("/verifyOtp", upload.single("avatar"), verifyOtp);

router.patch("/:id", updateUserOtp);

router.delete("/delete/:id", DeleteUser);

router.post("/login", userLogin);

//Development uses

module.exports = router;
