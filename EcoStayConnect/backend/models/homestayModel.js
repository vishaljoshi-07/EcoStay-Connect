const mongoose = require('mongoose');

const homestaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a homestay title'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price per night'],
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 4.5,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  ecoFeatures: {
    type: [String],
    required: [true, 'Please add sustainability features'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Set virtual properties for frontend compatibility
homestaySchema.virtual('name').get(function() {
  return this.title;
}).set(function(v) {
  this.title = v;
});

homestaySchema.virtual('sustainabilityTags').get(function() {
  return this.ecoFeatures;
}).set(function(v) {
  this.ecoFeatures = v;
});

const Homestay = mongoose.model('Homestay', homestaySchema);

module.exports = Homestay;
