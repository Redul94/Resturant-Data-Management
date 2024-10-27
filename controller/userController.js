const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const getUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");
    user.password = undefined;
    res.status(200).send("User get successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send("Error in getting user api");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.id);

    if (!user) return res.status(404).send("User not found");
    const { phone, address, email } = req.user;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (email) user.email = email;
    user.save();
    res.status(200).send("User update successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in api ");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, phone } = req.body;
    if (!email || !newPassword || !phone)
      return res.status(400).send("Please provide all fieald");
    const user = await userSchema.findOne({ email, phone });
    if (!user) return res.status(404).send("User not exist");
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send("User password reset successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in update Password api");
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    await userSchema.findByIdAndDelete(req.params.id);
    res.status(200).send("User record delete successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send("Invalid in delete api");
  }
};
module.exports = { getUser, updateUser, resetPassword ,deleteUser};
