const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send( "fill empty input");
  }
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    return res.send({token})
  } catch (error) {
    console.error(error.message);
    return res.status(422).send("login failed ,Try later");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send( "you must provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user)
    return res.status(422).send( "invalid credentials,Try Again.");

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send( "invalid credentials,Try Again." );
  }
});

module.exports = router
