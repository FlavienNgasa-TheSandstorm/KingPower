const { Sequelize } = require('sequelize');

// Railway injecte MYSQL_URL automatiquement !
const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 60000
  }
});

module.exports = sequelize;