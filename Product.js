const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offers: {
    type: String,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },

  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
