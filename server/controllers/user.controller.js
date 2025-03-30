const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


const registerUser  = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser  = await UserModel.findOne({ email });
    
    if (existingUser ) {
      return res.status(400).json({ message: "User  already registered" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }

      const user = new UserModel({ fullName, email, password: hash });

      await user.save();
      res.status(201).json({ message: "User  registered successfully", user });
    });
  } catch (error) {
    res.status(500).json({ message: "Error in registering user", error });
  }
};

const loginUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: "Wrong credentials, try again" });
      }

      const token = jwt.sign({ userID: user.id }, process.env.key, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again", "Error":error });
  }
};


module.exports =  {registerUser , loginUser } ;