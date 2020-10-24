const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const requreAuth = require("../middleware/requreAuth");
const Logistics = mongoose.model("logistics");

router.post("/logistics", requreAuth, async (req, res) => {
  const { product } = req.body;
  const logistics = new Logistics({
    product,
    currentUser: req.user._id,
  });

  try {
    await logistics.save();
    return res.send(
      "logistics created! goto logistic tab and start tracking your product"
    );
  } catch (error) {
    console.log(error);
    return res.send("error creating logistics");
  }
});

router.get("/logistics", requreAuth, async (req, res) => {
  try {
    const logistics = await Logistics.find({}).populate("product").exec();
    console.log(logistics);
    const log = [];

    logistics.map((logistic) => {
      console.log(logistic);
      if (
        logistic.currentUser.toString() === req.user._id.toString() ||
        logistic.product.userId.toString() === req.user._id.toString()
      ) {
        log.push(logistic);
      }
    });

    if (log) {
      return res.send(log);
    } else {
      return res.send();
    }

    // return res.send(logistics);
  } catch (error) {
    console.log(error);
    return res.send("error getting logistics data");
  }
});

router.patch("/logistics", requreAuth, async (req, res) => {
  const { locations, logisticId } = req.body;
  console.log(logisticId);
  try {
    const logistics = await Logistics.findById(logisticId).populate("product");
    console.log(logistics);
    if (!logistics)return res.status(404).send("logistic data not found");
    if (logistics.product.userId.toString() !== req.user._id.toString())
      return res.status(422).send("you can only view path");
    logistics.set({ locations });
    await logistics.save();
    return res.send("path uploaded succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("error sending cordinates.");
  }
});

module.exports = router;
