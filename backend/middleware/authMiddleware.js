const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');

// Protect routes - verify JWT token
const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ecostay_connect_jwt_secret_key_2026_super_secure');

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      res.status(401);
      throw new Error('Not authorized, token failed or expired');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no authentication token provided');
  }
});

// Grant access to specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`User role '${req.user ? req.user.role : 'none'}' is not authorized to perform this action`);
    }
    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
};
