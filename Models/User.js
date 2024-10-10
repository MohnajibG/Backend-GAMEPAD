const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    required: true,
    unique: true,
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  token: String,
  hash: String,
  salt: String,
});
module.exports = User;
