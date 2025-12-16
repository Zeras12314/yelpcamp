const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  authMe,
  logout,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth/me", authMe);
router.get("/logout", logout);

module.exports = router;
