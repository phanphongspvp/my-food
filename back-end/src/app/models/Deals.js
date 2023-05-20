const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Deals = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String },
    numberLct: { type: String },
  },
  { timestamps: true }
);

//Add plugin
Deals.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("Deals", Deals);
