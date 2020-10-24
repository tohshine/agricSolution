const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  publicId: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  shipping: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
});

mongoose.model("product", ProductSchema);
module.exports =mongoose.model("product", ProductSchema);