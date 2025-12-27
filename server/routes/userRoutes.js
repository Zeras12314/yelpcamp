const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  authMe,
  logout,
} = require("../controllers/userController");
const { asyncHandler } = require("../utils/asyncHandler");


router.post("/register", asyncHandler(registerUser));
router.post("/login", loginUser);
router.get("/auth/me", authMe);
router.get("/logout", logout);

module.exports = router;
