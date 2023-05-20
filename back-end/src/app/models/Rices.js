const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// mongoose.set('strictQuery', false);

const Rices = new mongoose.Schema(
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
Rices.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Rices", Rices);
