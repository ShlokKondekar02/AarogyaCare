const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const { getDB } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aarogyacare_fallback_jwt_secret_key_123');

      if (!admin.apps.length) {
        req.user = { id: decoded.id, name: 'Doctor / Clinical Staff', role: 'Doctor' };
        return next();
      }

      const db = getDB();
      const userDoc = await db.collection('users').doc(decoded.id).get();
      
      if (!userDoc.exists) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      const userData = userDoc.data();
      delete userData.password;
      
      req.user = { id: userDoc.id, ...userData };

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
