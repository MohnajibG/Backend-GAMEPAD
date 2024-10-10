const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema({
  gameId: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

    createdAt: {
      type: Date,
    },
  },
});

const Fav = mongoose.model("Fav", FavSchema);

module.exports = Fav;
