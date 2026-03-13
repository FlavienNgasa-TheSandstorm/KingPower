const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/sequelize');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MySQL (les variables sont automatiquement injectées)
const connectDB = async () => {
  try {
    // Railway injecte MYSQL_URL automatiquement
    await sequelize.authenticate();
    console.log('✅ Base de données connectée !');
  } catch (error) {
    console.error('❌ Erreur DB:', error.message);
    process.exit(1); // Arrête le service si pas de DB
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});