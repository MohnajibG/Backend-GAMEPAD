const express = require("express");
const Fav = require("../Models/Fav");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// Route pour ajouter un favori
router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    const { gameId } = req.body;

    // Vérification si le favori existe déjà pour cet utilisateur
    const existingFav = await Fav.findOne({ userId: req.user._id, gameId });
    if (existingFav) {
      return res
        .status(400)
        .json({ message: "Ce jeu est déjà dans les favoris" });
    }

    // Création et sauvegarde du nouveau favori
    const newFav = new Fav({
      userId: req.user._id,
      gameId,
      createdAt: new Date(),
    });
    await newFav.save();

    return res.status(201).json({ message: "Favori ajouté", favorite: newFav });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer un favori
router.delete("/favorites/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Recherche et suppression du favori
    const deletedFav = await Fav.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedFav) {
      return res.status(404).json({ message: "Favori non trouvé" });
    }

    return res.status(200).json({ message: "Favori supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer les favoris
router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Fav.find({ userId: req.user._id });

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
