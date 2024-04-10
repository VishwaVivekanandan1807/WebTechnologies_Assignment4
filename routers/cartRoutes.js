const express = require("express");
const router = express.Router();
const Cart = require("../Cart");

// Create cart
router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// retrieve all cart
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// retrieve  cart by ID
router.get("/:id", getCart, (req, res) => {
  res.json(res.cart);
});

//all carts of the user
router.get("/user/:id", async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.id });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add product to cart
router.post("/:id", getCart, async (req, res) => {
  res.cart.products.push(req.body);
  try {
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete a cart by ID
router.delete("/:id", getCart, async (req, res) => {
  try {
    await res.cart.deleteOne();
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.cart = cart;
  next();
}

module.exports = router;
