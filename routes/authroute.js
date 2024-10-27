const express = require("express");
const {
  registerController,
  logInController,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", logInController);

module.exports = router;
