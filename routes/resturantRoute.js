const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {resturantController,getResturantData} = require("../controller/resturantController");

const router = express.Router();
//Create Resturant route
router.post('/create',authMiddleware,resturantController);
router.get('/',getResturantData);
module.exports = router;
