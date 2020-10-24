const express = require("express");
const mongoose = require("mongoose");
const requreAuth = require("../middleware/requreAuth");
const Profile = mongoose.model("profile");

const router = express.Router();

router.post("/profile", requreAuth, async (req, res) => {
  const { name, address, phoneNumber } = req.body;
  if (!name && !address && !phoneNumber) return;

  const profile = new Profile({
    _id: req.user._id,
    name,
    address,
    phoneNumber,
  });

  try {
    await profile.save();
    return res.send("profile saved!!");
  } catch (error) {
    console.log(error);
    return res.status(422).send("error saving profile");
  }
});

router.get("/profile", requreAuth, async (req, res) => {
    const profile = await Profile.findById(req.user._id)
    if(!profile) return res.send(!{})
    return res.send(profile)
});

module.exports = router