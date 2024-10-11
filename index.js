const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./Routes/user");
const favoritesRoutes = require("./Routes/fav");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Connexion à la base de données MongoDB

mongoose.connect(process.env.MONGO_URI);
// Routes
app.use(userRouter); // Utilisation du préfixe "/user" pour plus de clarté
app.use(favoritesRoutes); // Préfixe "/favorites" pour plus de précision

// Route 404 pour les requêtes non trouvées
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Démarrage du serveur
app.listen(process.env.PORT, () => {
  console.log("SERVER STARTED 🚀");
});
