const mongoose = require("mongoose");
const Product = mongoose.model("product");

const express = require("express");
const requreAuth = require("../middleware/requreAuth");
const uploader = require("../middleware/cloudinary");
const router = express.Router();

router.post("/product", requreAuth, uploader, async (req, res) => {
  const { title, price, desc, location, number } = req.body;
  const { url, publicId } = req.imageData;
  if (!title && !price && !desc && !location && !number) return;

  const product = new Product({
    userId: req.user._id,
    publicId,
    title,
    price,
    desc,
    imageUrl: url,
    location,
    number,
  });

  try {
    await product.save();
    res.send("product uploaded");
  } catch (error) {
    res.status(402).send("error uploading product,Try later");
  }
});

router.get("/product", requreAuth, async (req, res) => {
  try {
    const product = await Product.find().populate("profile");
    if (!product) res.status(404).send("product not found");
    return res.send(product);
  } catch (error) {
    console.log(error);
    res.status(402).send("error getting product");
  }
});

router.patch("/product/:id", requreAuth, async (req, res) => {
  const { id } = req.params;
});

module.exports = router;
