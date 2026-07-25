const { body, validationResult } = require('express-validator');

// Helper to check validation results and send error response if any
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      message: extractedErrors[0] || 'Validation error',
      errors: extractedErrors
    });
  }
  next();
};

// Validation rules for Registration
const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['customer', 'owner', 'admin']).withMessage('Invalid user role'),
  handleValidationErrors
];

// Validation rules for Login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

// Validation rules for Profile Update
const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  handleValidationErrors
];

// Validation rules for Booking Creation
const validateBooking = [
  body('customerName')
    .trim()
    .notEmpty().withMessage('Customer name is required'),
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address'),
  body('homestayId')
    .notEmpty().withMessage('Homestay ID is required')
    .isMongoId().withMessage('Invalid Homestay ID format'),
  body('checkIn')
    .notEmpty().withMessage('Check-in date is required'),
  body('checkOut')
    .notEmpty().withMessage('Check-out date is required'),
  body('guests')
    .isInt({ min: 1 }).withMessage('At least 1 guest is required'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateBooking
};
