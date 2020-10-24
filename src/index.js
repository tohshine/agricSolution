require("./model/Logistics");
require("./model/Product");
require("./model/Profile");
require("./model/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressUploader = require('express-fileupload')
const cors = require('cors')

const AuthRoute = require("./routes/auhRoute");
const profileRoute = require("./routes/profileRoute");
const productRoute = require("./routes/productRoute");
const logisticsRoute = require("./routes/logisticsRoute");


const requireAuth = require("./middleware/requreAuth");

const port = process.env.PORT || 5001;
const app = express();

app.use(bodyParser.json());
app.use(expressUploader({
  useTempFiles:true
}))

app.use(cors())
app.use(AuthRoute);
app.use(profileRoute);
app.use(productRoute)
app.use(logisticsRoute)



const mongoURI =
  "mongodb+srv://tosco:tosco1234@agrosolve.ez2of.mongodb.net/agroSolve?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`You email:${req.user.email}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
