const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  customerInfo: {
    type: DataTypes.JSON,  // ← Vérifie que c'est bien JSON
    allowNull: true,
    defaultValue: null
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  paymentMethod: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'delivered'),
    defaultValue: 'pending'
  },
  shippingAddress: {
    type: DataTypes.JSON,
    allowNull: false
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;