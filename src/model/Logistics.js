const mongoose = require("mongoose");
const Product = require('../model/Product')

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    altitudeAccuracy:Number,
    speed: Number,
  },
});

const logisticSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  currentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  locations: [pointSchema],
});

logisticSchema.pre("save", async function (next) {
  const logistics = this;
  console.log(logistics);
  if(!logistics.isModified("product")){
    return next()
  }
  const product = await Product.findById(logistics.product);
  if (!product) return console.error("product not found");
  product.set({
    shipping: true,
  })
  await product.save();
  next()
});

mongoose.model("logistics", logisticSchema);
