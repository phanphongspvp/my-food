const mongoose = require("mongoose");

const Noodles = new mongoose.Schema(
  {
    image: { type: String },
    active: { type: Boolean },
    address: { type: String },
    sale: { type: Number },
    title: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Noodles", Noodles);
