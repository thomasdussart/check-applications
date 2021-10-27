const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.applications = require("./application.model");

db.mongoose = mongoose;

module.exports = db;
