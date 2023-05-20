const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Soups = new mongoose.Schema(
  {
    image: { type: String },
    active: { type: Boolean },
    address: { type: String },
    sale: { type: Number },
    title: { type: String },
  },
  { timestamps: true }
);

//Add plugin
Soups.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Soups", Soups);
