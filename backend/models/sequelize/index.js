const sequelize = require('./db');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');

// DÉFINIR LES RELATIONS
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Product,
  Order
};