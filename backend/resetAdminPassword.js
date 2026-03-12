const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./models/sequelize');

async function resetAdminPassword() {
  try {
    const email = 'admin@vitalis-help.cd';
    const newPassword = 'flavien'; // Changez si vous voulez
    
    // Générer un nouveau hash
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('🔐 Nouveau hash généré:', hashedPassword);
    
    // Trouver et mettre à jour l'admin
    const user = await User.findOne({ where: { email } });
    
    if (user) {
      user.password = newPassword; // Le hook s'occupera du hash
      await user.save();
      
      console.log('✅ Mot de passe admin réinitialisé avec succès !');
      console.log('📧 Email:', email);
      console.log('🔑 Nouveau mot de passe:', newPassword);
    } else {
      console.log('❌ Admin non trouvé');
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await sequelize.close();
  }
}

resetAdminPassword();