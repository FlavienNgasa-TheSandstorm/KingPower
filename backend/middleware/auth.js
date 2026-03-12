const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin || false;  // ← AJOUTEZ CETTE LIGNE
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};