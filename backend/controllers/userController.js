const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

// Helper to generate JWT token (Expiry: 7 days)
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, profileImage } = req.body;

  // Check if user already exists (Graceful duplicate handling)
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error('A user with this email address already exists. Please log in instead.');
  }

  // Create user (Password hashing is handled in userModel pre-save)
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: role || 'customer',
    profileImage: profileImage || undefined
  });

  if (user) {
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data provided');
  }
});

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() });

  // Check user & password match
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        savedHomestays: user.savedHomestays,
        createdAt: user.createdAt,
      }
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (Protected)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedHomestays');

  if (user) {
    res.status(200).json({
      success: true,
      data: user
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (Protected)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    
    if (req.body.email && req.body.email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email.toLowerCase() });
      if (emailExists) {
        res.status(400);
        throw new Error('This email address is already in use by another account');
      }
      user.email = req.body.email.toLowerCase();
    }

    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }

    if (req.body.password) {
      user.password = req.body.password; // Will be hashed by pre('save') hook
    }

    const updatedUser = await user.save();
    const token = generateToken(updatedUser._id);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      token,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        savedHomestays: updatedUser.savedHomestays,
        updatedAt: updatedUser.updatedAt
      }
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Toggle saving a homestay
// @route   POST /api/users/saved-homestays/:homestayId
// @access  Private (Protected)
const toggleSaveHomestay = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const homestayId = req.params.homestayId;

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const index = user.savedHomestays.indexOf(homestayId);
  let isSaved = false;

  if (index > -1) {
    user.savedHomestays.splice(index, 1);
    isSaved = false;
  } else {
    user.savedHomestays.push(homestayId);
    isSaved = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: isSaved ? 'Homestay saved to favorites' : 'Homestay removed from favorites',
    isSaved,
    savedHomestays: user.savedHomestays
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: {},
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  toggleSaveHomestay,
  getUsers,
  getUserById,
  deleteUser,
  generateToken
};
