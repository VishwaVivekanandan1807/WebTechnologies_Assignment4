const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose      // MongoDB Connection link
  .connect(
    "mongodb+srv://sgcsharan70:abcd1234@manchester.l5pfylf.mongodb.net/?retryWrites=true&w=majority&appName=Manchester"
  )
  .then(() => {
    console.log("Connected to the database!");
  });

// Models
const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const Comment = require("./Comment");
const Order = require("./Order");

// Router
const userRoutes = require("./routers/userRoutes");
const productRoutes = require("./routers/productRoutes");
const cartRoutes = require("./routers/cartRoutes");
const commentRoutes = require("./routers/commentRoutes");
const orderRoutes = require("./routers/orderRoutes");

app.use("/app/users", userRoutes);
app.use("/app/products", productRoutes);
app.use("/app/carts", cartRoutes);
app.use("/app/comments", commentRoutes);
app.use("/app/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is now running`);
});
