const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log("Singup");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ username, email, password });
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully.", user_id: user._id });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  console.log("Login");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
