const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"], 
  },
  email: {
    type: String,
    required: [true, "Email Address is required"], // Email is required
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: [true, "Password is required"], 
  },
});

module.exports = mongoose.model("User", userSchema);