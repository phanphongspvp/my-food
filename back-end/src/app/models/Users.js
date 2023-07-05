const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: Boolean, required: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, default: "default.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", Users);
