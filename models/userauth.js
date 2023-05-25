const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

authSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("UserAuth", authSchema);
