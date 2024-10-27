const express = require("express");
const router = express.Router();
const testController = require("../controller/testc");

router.get("/register", testController);

module.exports = router;
