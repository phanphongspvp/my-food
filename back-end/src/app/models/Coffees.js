const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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

//Add plugin
Coffees.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Coffees", Coffees);
