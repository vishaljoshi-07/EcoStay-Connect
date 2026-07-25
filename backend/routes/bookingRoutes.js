const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validateBooking } = require('../middleware/validators');

// Protect all booking routes
router.use(verifyToken);

router.route('/')
  .get(getBookings)
  .post(validateBooking, createBooking);

router.route('/:id')
  .get(getBookingById)
  .put(updateBooking)
  .delete(deleteBooking);

module.exports = router;
