const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  token: String,
  hash: String,
  salt: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
