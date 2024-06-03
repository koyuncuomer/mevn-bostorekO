import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { checkValidationErrors } from "../utils/index.js";
import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exist!" });
    }

    const newUser = await User.create(req.body);
    newUser.password = undefined;

    return res.status(201).json({ message: "User created!", user: newUser });
  } catch (error) {
    //Handle mongoose validation error
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.log("Error register", error);
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Password is not true!" });
    }

    user.password = undefined;

    //Generate token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_TIME})

    return res.status(200).json({ message: "User login success", user, token });
  } catch (error) {
    console.log("Error login", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { register, login };
