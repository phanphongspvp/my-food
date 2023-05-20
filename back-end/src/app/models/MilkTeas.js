const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const MilkTeas = new mongoose.Schema(
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
MilkTeas.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("MilkTeas", MilkTeas);
