const mongoose = require("mongoose");

const Coffees = new mongoose.Schema(
  {
    image: { type: String },
    active: { type: Boolean },
    address: { type: String },
    sale: { type: Number },
    title: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coffees", Coffees);
