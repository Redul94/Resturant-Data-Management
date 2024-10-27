const express = require("express");
const {getUser,updateUser,resetPassword, deleteUser} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware, getUser);
router.put("/updateuser",authMiddleware, updateUser);
router.post("/resetpassword",authMiddleware, resetPassword);
router.delete("/deleteuser/:id",authMiddleware, deleteUser);

module.exports = router;