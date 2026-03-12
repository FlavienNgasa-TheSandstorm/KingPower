const express = require('express');
const User = require('../models/sequelize/User');
const Product = require('../models/sequelize/Product');
const Order = require('../models/sequelize/Order');
const auth = require('../middleware/auth');
const router = express.Router();
// En haut de admin.js, ajoute :
const { Op } = require('sequelize');


// Middleware pour vérifier que l'utilisateur est admin
// Middleware pour vérifier que l'utilisateur est admin
const isAdmin = async (req, res, next) => {
  try {
    console.log('🔍 Vérification admin pour userId:', req.userId);
    
    const user = await User.findByPk(req.userId);
    console.log('👤 Utilisateur trouvé:', user ? 'Oui' : 'Non');
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return res.status(403).json({ message: 'Accès non autorisé' });
    }
    
    console.log('👑 isAdmin value:', user.isAdmin);
    console.log('📊 Type isAdmin:', typeof user.isAdmin);
    
    if (!user.isAdmin) {
      console.log('❌ Utilisateur non admin');
      return res.status(403).json({ message: 'Accès non autorisé' });
    }
    
    console.log('✅ Admin vérifié avec succès');
    next();
  } catch (error) {
    console.error('💥 Erreur middleware isAdmin:', error);
    res.status(500).json({ message: error.message });
  }
};



// backend/routes/admin.js - Route notifications corrigée

// GET toutes les notifications
router.get('/notifications', auth, isAdmin, async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const recentOrders = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: oneDayAgo }
      },
      include: [{ model: User, attributes: ['name'], required: false }],
      order: [['createdAt', 'DESC']],
      limit: 20
    });

    console.log('📦 Commandes trouvées:', recentOrders.length);
    
    const notifications = recentOrders.map(order => {
      // Log pour voir ce qu'on reçoit
      console.log('Commande ID:', order.id);
      console.log('  - User:', order.User?.name);
      console.log('  - customerInfo:', order.customerInfo);
      
      // Déterminer le nom du client
      let customerName = 'Client inconnu';
      
      // Si l'utilisateur est connecté (userId présent)
      if (order.User?.name) {
        customerName = order.User.name;
      } 
      // Sinon, utiliser customerInfo du formulaire
      else if (order.customerInfo && typeof order.customerInfo === 'object') {
        customerName = order.customerInfo.name || 'Client inconnu';
      }
      // Si customerInfo est une chaîne JSON, la parser
      else if (order.customerInfo && typeof order.customerInfo === 'string') {
        try {
          const parsed = JSON.parse(order.customerInfo);
          customerName = parsed.name || 'Client inconnu';
        } catch (e) {
          console.log('❌ Erreur parsing customerInfo:', e);
        }
      }
      
      return {
        id: order.id,
        type: 'new_order',
        title: '🛒 Nouvelle commande',
        message: `Commande #${order.id} - ${customerName}`,
        amount: order.total,
        time: order.createdAt,
        read: false,
        link: `/admin/orders/${order.id}`
      };
    });

    console.log('🔔 Notifications générées:', notifications.map(n => n.message));
    res.json(notifications);
    
  } catch (error) {
    console.error('❌ Erreur notifications:', error);
    res.status(500).json({ message: error.message });
  }
});

// PUT marquer une notification comme lue
router.put('/notifications/:id/read', auth, isAdmin, (req, res) => {
  // Ici tu peux stocker l'état "lu" dans une table notifications si besoin
  res.json({ success: true });
});

// PUT marquer tout comme lu
router.put('/notifications/read-all', auth, isAdmin, (req, res) => {
  res.json({ success: true });
});

// Statistiques dashboard
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.count();
    const totalProducts = await Product.count();
    const totalCustomers = await User.count();
    
    const orders = await Order.findAll({
      include: [{ model: User, attributes: ['name'], required: false }],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    const totalRevenue = await Order.sum('total', {
      where: { 
        paymentStatus: ['completed', 'delivered']
      }
    });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue || 0,
      totalProducts,
      totalCustomers,
      recentOrders: orders.map(order => {
        // Déterminer le nom du client
        let customerName = 'Client inconnu';
        
        if (order.User?.name) {
          customerName = order.User.name;
        } 
        else if (order.customerInfo) {
          // Si customerInfo est un objet
          if (typeof order.customerInfo === 'object' && order.customerInfo.name) {
            customerName = order.customerInfo.name;
          }
          // Si customerInfo est une chaîne JSON
          else if (typeof order.customerInfo === 'string') {
            try {
              const parsed = JSON.parse(order.customerInfo);
              customerName = parsed.name || 'Client inconnu';
            } catch (e) {
              // Ignorer
            }
          }
        }
        
        return {
          id: order.id,
          customerName: customerName,
          total: Number(order.total).toFixed(2),
          status: order.paymentStatus || 'pending',
          date: order.createdAt
        };
      })
    });
    
  } catch (error) {
    console.error('❌ Erreur stats:', error);
    res.status(500).json({ message: error.message });
  }
});

// CRUD produits (admin)
router.post('/products', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/products/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/products/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    await product.destroy();
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Gestion commandes (admin)
router.get('/orders', auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders.map(order => ({
      id: order.id,
      customerName: order.User?.name,
      total: order.total,
      paymentMethod: order.paymentMethod,
      status: order.paymentStatus,
      createdAt: order.createdAt
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/orders/:id', auth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    await order.update({ paymentStatus: req.body.status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Vérification du token admin
router.get('/verify', auth, isAdmin, (req, res) => {
  try {
    console.log('✅ Route /verify appelée');
    console.log('📝 userId:', req.userId);
    console.log('👑 isAdmin:', req.isAdmin);
    
    // Si on arrive ici, c'est que auth et isAdmin ont réussi
    res.json({ valid: true, userId: req.userId });
  } catch (error) {
    console.error('💥 Erreur dans /verify:', error);
    res.status(500).json({ message: error.message });
  }
});

// Récupérer tous les clients
router.get('/customers', auth, isAdmin, async (req, res) => {
  try {
    const customers = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Order,
        attributes: ['id', 'total', 'createdAt']
      }]
    });

    const formattedCustomers = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      addresses: customer.addresses,
      createdAt: customer.createdAt,
      totalOrders: customer.Orders?.length || 0,
      totalSpent: customer.Orders?.reduce((sum, order) => 
        order.paymentStatus === 'completed' ? sum + order.total : sum, 0
      ) || 0
    }));

    res.json(formattedCustomers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer une commande avec détails
router.get('/orders/:id', auth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name', 'email', 'phone'] },
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    console.log('📦 Commande brute:', {
      id: order.id,
      userId: order.userId,
      customerInfo: order.customerInfo,
      paymentStatus: order.paymentStatus
    });

    // S'assurer que customerInfo est un objet
    let customerInfo = order.customerInfo;
    if (typeof customerInfo === 'string') {
      try {
        customerInfo = JSON.parse(customerInfo);
      } catch (e) {
        customerInfo = {};
      }
    }

    const orderDetails = {
      id: order.id,
      total: order.total,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      customer: order.User,
      customerInfo: customerInfo,  // ← Ajoute cette ligne !
      items: order.items
    };

    console.log('📦 Détails envoyés:', {
      id: orderDetails.id,
      customerInfo: orderDetails.customerInfo
    });

    res.json(orderDetails);
  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;