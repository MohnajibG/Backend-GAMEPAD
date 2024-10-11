const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./Routes/user");
const favoritesRoutes = require("./Routes/fav");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose
  .connect(
    "mongodb+srv://MohNajibG:0pz6JhbVy0kOedp0@cluster0.r39lk.mongodb.net/gamepad",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use(userRouter); // Utilisation du préfixe "/user" pour plus de clarté
app.use(favoritesRoutes); // Préfixe "/favorites" pour plus de précision

// Route 404 pour les requêtes non trouvées
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log("SERVER STARTED 🚀");
});
