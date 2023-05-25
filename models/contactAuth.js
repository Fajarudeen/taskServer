const mongoose = require("mongoose");

const contactAuth = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserAuth",
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contactAuth", contactAuth);
