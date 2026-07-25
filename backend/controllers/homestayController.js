const Homestay = require('../models/homestayModel');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all homestays
// @route   GET /api/homestays
// @access  Public
const getHomestays = asyncHandler(async (req, res) => {
  const homestays = await Homestay.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: homestays.length,
    data: homestays,
  });
});

// @desc    Get single homestay
// @route   GET /api/homestays/:id
// @access  Public
const getHomestayById = asyncHandler(async (req, res) => {
  const homestay = await Homestay.findById(req.params.id);
  if (!homestay) {
    res.status(404);
    throw new Error('Homestay not found');
  }

  res.status(200).json({
    success: true,
    data: homestay,
  });
});

// @desc    Create a homestay
// @route   POST /api/homestays
// @access  Public
const createHomestay = asyncHandler(async (req, res) => {
  const { 
    title, 
    name, 
    location, 
    description, 
    price, 
    rating, 
    reviewsCount, 
    image, 
    ecoFeatures, 
    sustainabilityTags,
    ownerName,
    availability
  } = req.body;

  const finalTitle = title || name;
  const finalEcoFeatures = ecoFeatures || sustainabilityTags || [];

  if (!finalTitle || !location || !description || price === undefined) {
    res.status(400);
    throw new Error('Please fill in all required fields (title/name, location, description, price)');
  }

  const homestay = await Homestay.create({
    title: finalTitle,
    location,
    description,
    price: Number(price),
    rating: Number(rating || 4.5),
    reviewsCount: Number(reviewsCount || 0),
    image: image || 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
    ecoFeatures: finalEcoFeatures,
    ownerName: ownerName || 'Local Eco Host',
    availability: availability !== undefined ? availability : true,
  });

  res.status(201).json({
    success: true,
    message: 'Homestay created successfully',
    data: homestay,
  });
});

// @desc    Update an existing homestay
// @route   PUT /api/homestays/:id
// @access  Public
const updateHomestay = asyncHandler(async (req, res) => {
  let homestay = await Homestay.findById(req.params.id);
  if (!homestay) {
    res.status(404);
    throw new Error('Homestay not found');
  }

  const updateData = { ...req.body };
  if (req.body.name) updateData.title = req.body.name;
  if (req.body.sustainabilityTags) updateData.ecoFeatures = req.body.sustainabilityTags;

  homestay = await Homestay.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Homestay updated successfully',
    data: homestay,
  });
});

// @desc    Delete a homestay
// @route   DELETE /api/homestays/:id
// @access  Public
const deleteHomestay = asyncHandler(async (req, res) => {
  const homestay = await Homestay.findById(req.params.id);
  if (!homestay) {
    res.status(404);
    throw new Error('Homestay not found');
  }

  await Homestay.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Homestay deleted successfully',
    data: {},
  });
});

// @desc    Search homestays by location
// @route   GET /api/homestays/search
// @access  Public
const searchHomestays = asyncHandler(async (req, res) => {
  const { location } = req.query;
  if (!location) {
    res.status(400);
    throw new Error('Location query parameter is required for search');
  }

  const homestays = await Homestay.find({
    location: { $regex: location, $options: 'i' }
  });

  res.status(200).json({
    success: true,
    count: homestays.length,
    data: homestays,
  });
});

// @desc    Filter homestays by rating
// @route   GET /api/homestays/filter
// @access  Public
const filterHomestays = asyncHandler(async (req, res) => {
  const { rating } = req.query;
  if (!rating) {
    res.status(400);
    throw new Error('Rating query parameter is required for filtering');
  }

  const ratingNum = parseFloat(rating);
  if (isNaN(ratingNum)) {
    res.status(400);
    throw new Error('Rating must be a valid number');
  }

  const homestays = await Homestay.find({
    rating: { $gte: ratingNum }
  });

  res.status(200).json({
    success: true,
    count: homestays.length,
    data: homestays,
  });
});

module.exports = {
  getHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
  filterHomestays,
};
