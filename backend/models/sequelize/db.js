const { Sequelize } = require('sequelize');

// Affiche les variables pour debug (à supprimer après)
console.log('🔍 Variables Railway:');
console.log('- MYSQLHOST:', process.env.MYSQLHOST);
console.log('- MYSQLPORT:', process.env.MYSQLPORT);
console.log('- MYSQLUSER:', process.env.MYSQLUSER);
console.log('- MYSQLDATABASE:', process.env.MYSQLDATABASE);

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE || process.env.DB_NAME,
  process.env.MYSQLUSER || process.env.DB_USER,
  process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Active les logs SQL pour debug
    dialectOptions: {
      connectTimeout: 60000 // Augmente le timeout
    }
  }
);

module.exports = sequelize;