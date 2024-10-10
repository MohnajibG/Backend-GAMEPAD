const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./Routes/user");
const favoritesRoutes = require("./Routes/fav");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/gamepad");

app.use(userRouter);
app.use(favoritesRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(3000, () => {
  console.log("SERVER STARTED 🚀");
});
