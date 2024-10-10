const express = require("express");
const Fav = require("../Models/Fav");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// Route pour ajouter un favori
router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    const { gameId } = req.body;

    // vérification si le favori existe déjà pour cet utilisateur
    const existingFav = await Fav.findOne({ userId: req.user._id, gameId });
    if (existingFav) {
      return res.status(400).json({ message: "Ce jeu est déjà en favoris" });
    }

    // Création et sauvegarde du nouveau favori
    const newFav = new Fav({
      userId: req.user._id,
      gameId,
      createdAt: new Date(),
    });
    await newFav.save();

    res.status(201).json({ message: "Favori ajouté", favorite: newFav });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.status(200).json({ message: "Favori supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Fav.find({ userId: req.user._id });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
