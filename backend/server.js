const express = require('express');
const cors = require('cors');
// Après dotenv.config(), ajoute :
console.log('🔍 Vérification des variables:');
console.log('MYSQLHOST:', process.env.MYSQLHOST ? '✅ Présent' : '❌ Manquant');
console.log('MYSQLPORT:', process.env.MYSQLPORT ? '✅ Présent' : '❌ Manquant');
console.log('MYSQLUSER:', process.env.MYSQLUSER ? '✅ Présent' : '❌ Manquant');
console.log('MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? '✅ Présent' : '❌ Manquant');
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE ? '✅ Présent' : '❌ Manquant');
const dotenv = require('dotenv');
const { sequelize } = require('./models/sequelize');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();

// Configuration CORS pour accepter vos frontends déployés
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  // Ajoutez vos URLs Railway/Vercel après déploiement
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
].filter(Boolean); // Supprime les valeurs undefined

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test de connexion DB avec gestion d'erreur améliorée
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de données connectée avec succès !');
    
    // Synchroniser les modèles (optionnel, à utiliser avec précaution)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('✅ Modèles synchronisés');
    }
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
    console.log('🔄 Nouvelle tentative dans 5 secondes...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/admin', adminRoutes);

// Route de santé pour Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: sequelize.authenticate() ? 'connected' : 'checking'
  });
});

// Route racine pour vérifier que l'API tourne
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API Vitalis Help opérationnelle',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL de l'API: http://localhost:${PORT}`);
});