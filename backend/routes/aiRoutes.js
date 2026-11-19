const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { handleAiChat } = require('../controllers/aiController');
const User = require('../models/userModel');

// Flexible auth middleware: authenticates user if valid token present,
// supports demo tokens, and allows guests without blocking with 401
const flexibleAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    if (token && token.startsWith('mock_jwt_token_')) {
      req.user = { _id: 'demo_user', role: 'customer', name: 'Demo Eco Traveler' };
      return next();
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ecostay_connect_jwt_secret_key_2026_super_secure');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      req.user = { _id: 'guest_user', role: 'customer', name: 'Guest Traveler' };
    }
  } else {
    req.user = { _id: 'guest_user', role: 'customer', name: 'Guest Traveler' };
  }
  next();
};

// AI Chat Route (accessible to logged-in users, demo users, and curious guests)
router.post('/chat', flexibleAuth, handleAiChat);

module.exports = router;
