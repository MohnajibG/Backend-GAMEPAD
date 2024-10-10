const express = require("express");
const User = require("../Models/User");

const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Route de signup
router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérification des paramètres
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }
    const userEmail = await User.findOne({ email: email });

    if (userEmail) {
      return res.status(409).json({ message: "Email already in database" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Génération du hash et du salt
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    // Génération du token
    const token = uid2(16);

    const newUser = new User({
      username: username,
      email: email,
      token: token,
      hash: hash,
      salt: salt,
    });

    console.log(newUser);

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Route de login
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification des paramètres
    if (!email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validation du mot de passe
    const hash = SHA256(password + user.salt).toString(encBase64);
    if (hash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Renvoie du token
    return res.status(200).json({ token: user.token, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
