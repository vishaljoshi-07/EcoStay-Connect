const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  toggleSaveHomestay,
  getUsers,
  getUserById,
  deleteUser,
  generateToken,
} = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
} = require('../middleware/validators');
const { authRateLimiter } = require('../middleware/rateLimiter');

// Public Authentication Routes with Rate Limiting & Validation
router.post('/register', authRateLimiter, validateRegister, registerUser);
router.post('/login', authRateLimiter, validateLogin, loginUser);

// Also accept direct POST to / (for backwards compatibility)
router.post('/', authRateLimiter, validateRegister, registerUser);

// Google OAuth Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT token for OAuth user and redirect to frontend
    const token = generateToken(req.user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/login?token=${token}&email=${encodeURIComponent(req.user.email)}`);
  }
);

// Protected User Profile Routes
router.route('/profile')
  .get(verifyToken, getUserProfile)
  .put(verifyToken, validateProfileUpdate, updateUserProfile);

// Saved Homestays Route
router.post('/saved-homestays/:homestayId', verifyToken, toggleSaveHomestay);

// Admin Routes for User Management
router.route('/')
  .get(verifyToken, authorizeRoles('admin'), getUsers);

router.route('/:id')
  .get(verifyToken, authorizeRoles('admin'), getUserById)
  .delete(verifyToken, authorizeRoles('admin'), deleteUser);

module.exports = router;
