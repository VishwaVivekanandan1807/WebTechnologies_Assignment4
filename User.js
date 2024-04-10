const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
  },
  alternateAddress: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
