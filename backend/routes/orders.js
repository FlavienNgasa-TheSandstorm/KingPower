const express = require('express');
const Order = require('../models/sequelize/Order');
const Product = require('../models/sequelize/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// GET toutes les commandes d'un utilisateur (avec compte)
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET une commande spécifique (pour utilisateur connecté)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET une commande spécifique pour invité (sans auth)
router.get('/guest/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer une nouvelle commande (avec ou sans compte)
// POST créer une nouvelle commande
router.post('/', async (req, res) => {
  const transaction = await Order.sequelize.transaction();
  
  try {
    const { items, paymentMethod, shippingAddress, customerInfo } = req.body;
    
    console.log('📦 Données reçues:', { items, paymentMethod, shippingAddress, customerInfo });

    // Calculer le total
    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new Error(`Produit ${item.productId} non trouvé`);
      }
      total += Number(product.price) * item.quantity;
    }

    // Préparer les données
    const orderData = {
      total,
      paymentMethod,
      paymentStatus: 'pending',
      shippingAddress,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: Number(item.price)
      }))
    };

    // Ajouter customerInfo seulement s'il existe
    if (customerInfo && Object.keys(customerInfo).length > 0) {
      orderData.customerInfo = customerInfo;
      console.log('📝 customerInfo ajouté aux données:', orderData.customerInfo);
    }

    console.log('🔥 Données avant création:', orderData);

    // Créer la commande
    const order = await Order.create(orderData, { transaction });
    
    await transaction.commit();
    
    console.log('✅ Commande créée avec ID:', order.id);
    console.log('✅ customerInfo dans la BDD:', order.customerInfo);
    
    res.status(201).json(order);
    
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Erreur création commande:', error);
    res.status(500).json({ message: error.message });
  }
});
// PUT mettre à jour le statut de paiement
router.put('/:id/payment-status', auth, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findOne({
      where: { 
        id: req.params.id,
        userId: req.userId
      }
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    await order.update({ paymentStatus });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;