const mongoose = require('mongoose');
const { createLocalModel } = require('../config/localDb');

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

const MongoBooking = mongoose.model('Booking', bookingSchema);
const LocalBooking = createLocalModel('bookings');

const BookingProxy = new Proxy(MongoBooking, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1 && global.isMongoConnected) {
      return target[prop];
    }
    if (prop in LocalBooking) {
      return LocalBooking[prop];
    }
    return target[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1 && global.isMongoConnected) {
      return new target(...args);
    }
    return LocalBooking.create(args[0]);
  }
});

module.exports = BookingProxy;
