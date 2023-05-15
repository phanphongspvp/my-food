const mongoose = require("mongoose");

const Deals = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String },
    numberLct: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deals", Deals);
