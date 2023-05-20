const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Juices = new mongoose.Schema(
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
Juices.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Juices", Juices);
