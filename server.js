const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const connexionDB = require("./config/db.config");
const db = require("./models");
const Applications = require("./models/application.model");
require("dotenv").config();
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 1337;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.use(express.static(__dirname + "/build"));
app.use(cors());

connexionDB();

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.ionos.fr",
  auth: {
    user: "inscriptions@parallaxawards.be",
    pass: `${process.env.MAIL_PASS}`,
  },
  secure: true,
});

// Routes
require("./routes/applications.routes")(app);
require("./routes/form.routes")(app);
