const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'sante-masculine'
  },
  benefits: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  ingredients: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;