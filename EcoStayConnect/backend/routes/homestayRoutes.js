const express = require('express');
const router = express.Router();
const {
  getHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
  filterHomestays,
} = require('../controllers/homestayController');

// Specific search and filter routes must be defined before ID-specific routes
router.get('/search', searchHomestays);
router.get('/filter', filterHomestays);

// Base operations
router.route('/')
  .get(getHomestays)
  .post(createHomestay);

// ID operations
router.route('/:id')
  .get(getHomestayById)
  .put(updateHomestay)
  .delete(deleteHomestay);

module.exports = router;
