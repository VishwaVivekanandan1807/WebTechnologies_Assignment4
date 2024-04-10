const express = require("express");
const router = express.Router();
const User = require("../User");

// Create  user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete user 
router.delete("/:id", getUser, async (req, res) => {
  console.log(res.user);
  try {
    await res.user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user 
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.mobile != null) {
    res.user.mobile = req.body.mobile;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.shippingAddress != null) {
    res.user.shippingAddress = req.body.shippingAddress;
  }
  if (req.body.alternateAddress != null) {
    res.user.alternateAddress = req.body.alternateAddress;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
