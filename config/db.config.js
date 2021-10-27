const mongoose = require("mongoose");

const ConnectionDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = ConnectionDb;
