const mongoose = require("mongoose");

const Applications = mongoose.model(
  "Applications",
  new mongoose.Schema({
    category: String,
    //perso
    name: String,
    firstname: String,
    birthdate: String,
    birthLocation: String,
    nationality: String,
    //contact
    email: String,
    phone: Number,
    adress: String,
    artistName: String,
    instaHandle: String,
    facebookHandle: String,
    website: String,
    //oeuvre
    title: String,
    artDate: String,
    context: String,
    link: String,
    //CC accept
    criteres: Boolean,
    ccAccept: Boolean,
  })
);

module.exports = Applications;
