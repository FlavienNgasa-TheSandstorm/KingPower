// createAdmin.js
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('Hash généré:', hashedPassword);

  try {
    await connection.execute(
      `INSERT INTO users (name, email, password, phone, isAdmin, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE 
       password = VALUES(password),
       isAdmin = VALUES(isAdmin)`,
      ['Administrateur', 'admin@vitalis-help.cd', hashedPassword, '+243123456789', true]
    );
    
    console.log('✅ Admin créé/mis à jour !');
    console.log('📧 Email: admin@vitalis-help.cd');
    console.log('🔑 Mot de passe: admin123');
    console.log('🔐 Hash:', hashedPassword);
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await connection.end();
  }
}

createAdmin();