const userSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password || !phone || !address)
      return res.status(500).send({
        success: false,
        message: "All field must be fullfilled",
      });
    const exiting = await userSchema.findOne({ email });
    if (exiting) return res.status(500).send("This user already registered");
    const salt = bcrypt.genSaltSync(10);
    const hashPassword =await bcrypt.hash(password, salt);
    const users = await userSchema.create({
      username,
      email,
      password:hashPassword,
      phone,
      address,
    });
    return res.status(201).send("User register successfully");
  } catch (er) {
    console.log("Api called failed", er);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const logInController = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password)
      return res.status(500).send({
        success: false,
        message: "All field must be fullfilled",
      });
    const user = await userSchema.findOne({ email});
    if (!user) return res.status(404).send("This user not founded");
    const validPassword= await bcrypt.compare(password,user.password);
    if (!validPassword) return res.status(404).send("Incorrect password");
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7D'})
    // user.password=undefined;

    return res.status(201).send({
      message:"User login successfully",
      token,
    });
  } catch (er) {
    console.log("Api called failed", er);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerController, logInController };
