const sequelize = require('./models/sequelize/index');
const User = require('./models/sequelize/User');
const Product = require('./models/sequelize/Product');
const Order = require('./models/sequelize/Order');

// Définir les relations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Synchroniser tous les modèles
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // { force: true } supprime et recrée les tables
    console.log('✅ Tables créées avec succès !');
    
    // Créer un produit par défaut (Strong Man)
    await Product.create({
      name: 'Strong Man',
      description: 'La solution naturelle pour une santé masculine épanouie',
      price: 49.99,
      stock: 100,
      benefits: [
        'Améliore la vitalité sexuelle',
        'Prolonge la durée des rapports',
        'Renforce la confiance en soi'
      ],
      ingredients: ['Ingrédient naturel A', 'Ingrédient naturel B', 'Vitamine C'],
      images: ['/uploads/strong-man-1.jpg', '/uploads/strong-man-2.jpg']
    });
    
    console.log('✅ Produit Strong Man créé !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  } finally {
    process.exit();
  }
};

syncDatabase();