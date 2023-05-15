const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.log("Connect to mongoDB Failure.");
  }
}

module.exports = { connect };
