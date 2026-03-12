const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/sequelize/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer l'utilisateur (le mot de passe sera hashé automatiquement par le hook)
    const user = await User.create({
      name,
      email,
      password, // Mot de passe en clair, le hook s'occupe du hash
      phone
    });

    // Créer le token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe avec la méthode du modèle
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Créer le token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET profil utilisateur
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] } // Ne pas renvoyer le mot de passe
    });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT mise à jour profil
router.put('/update', auth, async (req, res) => {
  try {
    const { name, email, phone, currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mise à jour des informations de base
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // Si changement de mot de passe
    if (currentPassword && newPassword) {
      const isValidPassword = await user.validatePassword(currentPassword);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
      }
      user.password = newPassword; // Le hook beforeUpdate s'occupera du hash
    }

    await user.save();
    
    // Renvoyer l'utilisateur sans le mot de passe
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login admin spécial
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('=== TENTATIVE ADMIN LOGIN ===');
    console.log('Email reçu:', email);
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    console.log('✅ Utilisateur trouvé:', user.email);
    console.log('👑 isAdmin dans BDD:', user.isAdmin);
    console.log('🔑 Type isAdmin:', typeof user.isAdmin);
    
    // Test force isAdmin pour voir
    if (!user.isAdmin) {
      console.log('❌ Utilisateur non admin');
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    const isValidPassword = await user.validatePassword(password);
    console.log('🔐 Mot de passe valide:', isValidPassword);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ Connexion admin réussie');
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('💥 Erreur:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;