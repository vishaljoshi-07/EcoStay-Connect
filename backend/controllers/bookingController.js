const Booking = require('../models/bookingModel');
const Homestay = require('../models/homestayModel');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get bookings (User's own bookings if customer, all if admin)
// @route   GET /api/bookings
// @access  Private (Protected)
const getBookings = asyncHandler(async (req, res) => {
  let query = {};
  
  // If user is a customer, show only their bookings
  if (req.user && req.user.role === 'customer') {
    query = { email: req.user.email };
  }

  const bookings = await Booking.find(query)
    .populate('homestayId')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('homestayId');
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Authorization check for customer
  if (req.user.role === 'customer' && booking.email !== req.user.email) {
    res.status(403);
    throw new Error('Not authorized to access this booking');
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { customerName, email, homestayId, checkIn, checkOut, guests, bookingStatus } = req.body;

  // Set defaults from logged in user if available
  const userCustomerName = customerName || (req.user ? req.user.name : '');
  const userEmail = email || (req.user ? req.user.email : '');

  if (!userCustomerName || !userEmail || !homestayId || !checkIn || !checkOut || !guests) {
    res.status(400);
    throw new Error('Please fill in all booking fields');
  }

  // Verify homestay exists
  const homestay = await Homestay.findById(homestayId);
  if (!homestay) {
    res.status(404);
    throw new Error('Referenced homestay not found');
  }

  const booking = await Booking.create({
    customerName: userCustomerName,
    email: userEmail.toLowerCase(),
    homestayId,
    checkIn,
    checkOut,
    guests,
    bookingStatus: bookingStatus || 'Confirmed'
  });

  const populatedBooking = await Booking.findById(booking._id).populate('homestayId');

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: populatedBooking,
  });
});

// @desc    Update a booking status/details
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = asyncHandler(async (req, res) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check authorization
  if (req.user.role === 'customer' && booking.email !== req.user.email) {
    res.status(403);
    throw new Error('Not authorized to update this booking');
  }

  booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('homestayId');

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: booking,
  });
});

// @desc    Delete/Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check authorization
  if (req.user.role === 'customer' && booking.email !== req.user.email) {
    res.status(403);
    throw new Error('Not authorized to delete this booking');
  }

  await Booking.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Booking cancelled successfully',
    data: { _id: req.params.id },
  });
});

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
