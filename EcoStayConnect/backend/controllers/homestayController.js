const mongoose = require('mongoose');
const Homestay = require('../models/homestayModel');
const asyncHandler = require('../utils/asyncHandler');

// Graceful in-memory fallback list if MongoDB is offline
let fallbackHomestays = [
  {
    id: 'fallback-1',
    _id: 'fallback-1',
    title: 'The Whispering Pines Sanctuary',
    name: 'The Whispering Pines Sanctuary',
    location: 'Manali, Himachal Pradesh',
    ecoFeatures: ['Solar Powered', 'Rainwater Harvesting', 'Zero Single-Use Plastic'],
    sustainabilityTags: ['Solar Powered', 'Rainwater Harvesting', 'Zero Single-Use Plastic'],
    description: 'A serene wooden cabin nestled among towering pine trees, offering panoramic Himalayan views and a fully eco-conscious living experience.',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    price: 3500,
    rating: 4.9,
    reviewsCount: 48,
    createdAt: new Date('2026-06-20')
  },
  {
    id: 'fallback-2',
    _id: 'fallback-2',
    title: 'Emerald Valley Bamboo Retreat',
    name: 'Emerald Valley Bamboo Retreat',
    location: 'Wayanad, Kerala',
    ecoFeatures: ['Local Materials', 'Organic Farming', 'Compost Systems'],
    sustainabilityTags: ['Local Materials', 'Organic Farming', 'Compost Systems'],
    description: 'Stay in an architectural marvel built entirely from locally sourced bamboo. Experience living in harmony with nature in the heart of the Western Ghats.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    price: 4200,
    rating: 4.8,
    reviewsCount: 36,
    createdAt: new Date('2026-06-21')
  },
  {
    id: 'fallback-3',
    _id: 'fallback-3',
    title: 'Cloud-Kissed Mud Haven',
    name: 'Cloud-Kissed Mud Haven',
    location: 'Coorg, Karnataka',
    ecoFeatures: ['Bio Gas', 'Farm-to-Table Dining', 'Energy Efficient'],
    sustainabilityTags: ['Bio Gas', 'Farm-to-Table Dining', 'Energy Efficient'],
    description: 'Hand-built mud cottage surrounded by lush coffee plantations. Offers farm-to-table dining, local bird watching guide, and carbon-neutral stays.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    price: 2800,
    rating: 4.7,
    reviewsCount: 29,
    createdAt: new Date('2026-06-22')
  },
  {
    id: 'fallback-4',
    _id: 'fallback-4',
    title: 'Himalayan Stone Eco-Cottage',
    name: 'Himalayan Stone Eco-Cottage',
    location: 'Almora, Uttarakhand',
    ecoFeatures: ['Recycled Water', 'Zero Waste Policy', 'Cultural Heritage'],
    sustainabilityTags: ['Recycled Water', 'Zero Waste Policy', 'Cultural Heritage'],
    description: 'Reconstructed vintage stone house utilizing traditional hill architecture. Enjoy stargazing, fresh mountain spring water, and locally guided treks.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    price: 3100,
    rating: 4.9,
    reviewsCount: 42,
    createdAt: new Date('2026-06-23')
  },
  {
    id: 'fallback-5',
    _id: 'fallback-5',
    title: 'Ganges Edge Mud Retreat',
    name: 'Ganges Edge Mud Retreat',
    location: 'Rishikesh, Uttarakhand',
    ecoFeatures: ['Solar Energy', 'Vegan Kitchen', 'Natural Cooling'],
    sustainabilityTags: ['Solar Energy', 'Vegan Kitchen', 'Natural Cooling'],
    description: 'Eco-friendly cottages close to the Ganga riverbank. Focuses on yoga, organic herbal gardens, and absolute low-impact, peaceful living.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    price: 2500,
    rating: 4.6,
    reviewsCount: 18,
    createdAt: new Date('2026-06-24')
  },
  {
    id: 'fallback-6',
    _id: 'fallback-6',
    title: 'Teakwood Forest Bungalow',
    name: 'Teakwood Forest Bungalow',
    location: 'Shimla, Himachal Pradesh',
    ecoFeatures: ['Rain Harvesting', 'LED Smart Lighting', 'Local Support'],
    sustainabilityTags: ['Rain Harvesting', 'LED Smart Lighting', 'Local Support'],
    description: 'Experience old-world charm in a colonial-style bungalow managed with modern sustainability standards in deep cedar woods.',
    image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80',
    price: 3800,
    rating: 4.8,
    reviewsCount: 31,
    createdAt: new Date('2026-06-25')
  }
];

// Helper function to check if Mongoose DB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all homestays
// @route   GET /api/homestays
// @access  Public
const getHomestays = asyncHandler(async (req, res) => {
  if (!isDbConnected()) {
    console.log('MongoDB offline: Serving in-memory fallback homestays');
    return res.status(200).json({
      success: true,
      count: fallbackHomestays.length,
      data: fallbackHomestays,
      fallback: true
    });
  }

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
  if (!isDbConnected()) {
    const homestay = fallbackHomestays.find(h => h.id === req.params.id || h._id === req.params.id);
    if (!homestay) {
      res.status(404);
      throw new Error('Homestay not found (in-memory mode)');
    }
    return res.status(200).json({
      success: true,
      data: homestay,
      fallback: true
    });
  }

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
  const { title, name, location, description, price, rating, reviewsCount, image, ecoFeatures, sustainabilityTags } = req.body;

  const finalTitle = title || name;
  const finalEcoFeatures = ecoFeatures || sustainabilityTags || [];

  if (!finalTitle || !location || !description || price === undefined) {
    res.status(400);
    throw new Error('Please fill in all required fields (title, location, description, price)');
  }

  if (!isDbConnected()) {
    const newId = `fallback-${Date.now()}`;
    const newHomestay = {
      id: newId,
      _id: newId,
      title: finalTitle,
      name: finalTitle,
      location,
      description,
      price: Number(price),
      rating: Number(rating || 4.5),
      reviewsCount: Number(reviewsCount || 0),
      image: image || 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
      ecoFeatures: finalEcoFeatures,
      sustainabilityTags: finalEcoFeatures,
      createdAt: new Date(),
      fallback: true
    };
    fallbackHomestays.unshift(newHomestay);
    return res.status(201).json({
      success: true,
      message: 'Homestay created successfully (in-memory fallback)',
      data: newHomestay,
      fallback: true
    });
  }

  const homestay = await Homestay.create({
    title: finalTitle,
    location,
    description,
    price,
    rating,
    reviewsCount,
    image,
    ecoFeatures: finalEcoFeatures,
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
  if (!isDbConnected()) {
    const index = fallbackHomestays.findIndex(h => h.id === req.params.id || h._id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Homestay not found (in-memory mode)');
    }

    const updated = {
      ...fallbackHomestays[index],
      ...req.body
    };

    if (req.body.name) updated.title = req.body.name;
    if (req.body.sustainabilityTags) {
      updated.ecoFeatures = req.body.sustainabilityTags;
      updated.sustainabilityTags = req.body.sustainabilityTags;
    }

    fallbackHomestays[index] = updated;
    return res.status(200).json({
      success: true,
      message: 'Homestay updated successfully (in-memory fallback)',
      data: updated,
      fallback: true
    });
  }

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
  if (!isDbConnected()) {
    const index = fallbackHomestays.findIndex(h => h.id === req.params.id || h._id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error('Homestay not found (in-memory mode)');
    }
    fallbackHomestays.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'Homestay deleted successfully (in-memory fallback)',
      data: {},
      fallback: true
    });
  }

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

  if (!isDbConnected()) {
    console.log(`MongoDB offline: Searching location "${location}" in fallback list`);
    const results = fallbackHomestays.filter(h => 
      h.location.toLowerCase().includes(location.toLowerCase())
    );
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      fallback: true
    });
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

  if (!isDbConnected()) {
    console.log(`MongoDB offline: Filtering rating >= ${ratingNum} in fallback list`);
    const results = fallbackHomestays.filter(h => h.rating >= ratingNum);
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      fallback: true
    });
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
