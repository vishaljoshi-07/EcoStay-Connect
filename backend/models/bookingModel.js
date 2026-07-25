const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please add a customer name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email address'
    ]
  },
  homestayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homestay',
    required: [true, 'Please reference a homestay ID'],
  },
  checkIn: {
    type: Date,
    required: [true, 'Please specify check-in date'],
  },
  checkOut: {
    type: Date,
    required: [true, 'Please specify check-out date'],
  },
  guests: {
    type: Number,
    required: [true, 'Please add the number of guests'],
    min: [1, 'Must have at least 1 guest'],
  },
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  }
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
