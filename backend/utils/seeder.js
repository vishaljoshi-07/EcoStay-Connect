const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Homestay = require('../models/homestayModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

// Load environment variables
dotenv.config({ path: './.env' });

const users = [
  {
    name: 'Traveler Eco User',
    email: 'traveler@ecostay.org',
    password: 'password123',
    role: 'customer'
  },
  {
    name: 'Admin User',
    email: 'admin@ecostay.com',
    password: 'adminpassword',
    role: 'admin'
  },
  {
    name: 'Devi Prasad',
    email: 'devi.prasad@gmail.com',
    password: 'ownerpassword456',
    role: 'owner'
  }
];

const homestays = [
  {
    title: 'The Whispering Pines Sanctuary',
    location: 'Manali, Himachal Pradesh',
    ecoFeatures: ['Solar Powered', 'Rainwater Harvesting', 'Zero Single-Use Plastic'],
    description: 'A serene wooden cabin nestled among towering pine trees, offering panoramic Himalayan views and a fully eco-conscious living experience.',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    price: 3500,
    rating: 4.9,
    reviewsCount: 48,
    ownerName: 'Devi Prasad',
    availability: true
  },
  {
    title: 'Emerald Valley Bamboo Retreat',
    location: 'Wayanad, Kerala',
    ecoFeatures: ['Local Materials', 'Organic Farming', 'Compost Systems'],
    description: 'Stay in an architectural marvel built entirely from locally sourced bamboo. Experience living in harmony with nature in the heart of the Western Ghats.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    price: 4200,
    rating: 4.8,
    reviewsCount: 36,
    ownerName: 'Joseph Kuriakose',
    availability: true
  },
  {
    title: 'Cloud-Kissed Mud Haven',
    location: 'Coorg, Karnataka',
    ecoFeatures: ['Bio Gas', 'Farm-to-Table Dining', 'Energy Efficient'],
    description: 'Hand-built mud cottage surrounded by lush coffee plantations. Offers farm-to-table dining, local bird watching guide, and carbon-neutral stays.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    price: 2800,
    rating: 4.7,
    reviewsCount: 29,
    ownerName: 'Kaveri Gowda',
    availability: true
  },
  {
    title: 'Himalayan Stone Eco-Cottage',
    location: 'Almora, Uttarakhand',
    ecoFeatures: ['Recycled Water', 'Zero Waste Policy', 'Cultural Heritage'],
    description: 'Reconstructed vintage stone house utilizing traditional hill architecture. Enjoy stargazing, fresh mountain spring water, and locally guided treks.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    price: 3100,
    rating: 4.9,
    reviewsCount: 42,
    ownerName: 'Bhuvan Joshi',
    availability: true
  },
  {
    title: 'Ganges Edge Mud Retreat',
    location: 'Rishikesh, Uttarakhand',
    ecoFeatures: ['Solar Energy', 'Vegan Kitchen', 'Natural Cooling'],
    description: 'Eco-friendly cottages close to the Ganga riverbank. Focuses on yoga, organic herbal gardens, and absolute low-impact, peaceful living.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    price: 2500,
    rating: 4.6,
    reviewsCount: 18,
    ownerName: 'Swami Sivananda Eco Trust',
    availability: true
  },
  {
    title: 'Teakwood Forest Bungalow',
    location: 'Shimla, Himachal Pradesh',
    ecoFeatures: ['Rain Harvesting', 'LED Smart Lighting', 'Local Support'],
    description: 'Experience old-world charm in a colonial-style bungalow managed with modern sustainability standards in deep cedar woods.',
    image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80',
    price: 3800,
    rating: 4.8,
    reviewsCount: 31,
    ownerName: 'Ramesh Sharma',
    availability: false
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/ecostay_connect';
    await mongoose.connect(mongoUri);
    console.log('Database connected for seeding.');

    // Clear existing data
    await Booking.deleteMany({});
    await Homestay.deleteMany({});
    await User.deleteMany({});
    console.log('Existing collections cleared.');

    // Create Users via User.create to trigger pre('save') password hashing
    const seededUsers = [];
    for (const u of users) {
      const createdUser = await User.create(u);
      seededUsers.push(createdUser);
    }
    console.log(`${seededUsers.length} Users seeded.`);

    // Seed Homestays
    const seededHomestays = await Homestay.insertMany(homestays);
    console.log(`${seededHomestays.length} Homestays seeded.`);

    // Seed sample Bookings
    const bookingList = [
      {
        customerName: 'Traveler Eco User',
        email: 'traveler@ecostay.org',
        homestayId: seededHomestays[0]._id, // The Whispering Pines Sanctuary
        checkIn: new Date('2026-08-10'),
        checkOut: new Date('2026-08-15'),
        guests: 2,
        bookingStatus: 'Confirmed'
      },
      {
        customerName: 'Traveler Eco User',
        email: 'traveler@ecostay.org',
        homestayId: seededHomestays[1]._id, // Emerald Valley Bamboo Retreat
        checkIn: new Date('2026-09-01'),
        checkOut: new Date('2026-09-05'),
        guests: 3,
        bookingStatus: 'Pending'
      }
    ];

    const seededBookings = await Booking.insertMany(bookingList);
    console.log(`${seededBookings.length} Bookings seeded.`);

    console.log('Data seeded successfully.');
    process.exit();
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/ecostay_connect';
    await mongoose.connect(mongoUri);
    
    await Booking.deleteMany({});
    await Homestay.deleteMany({});
    await User.deleteMany({});
    
    console.log('All data deleted from database.');
    process.exit();
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    process.exit(1);
  }
};

// Check for command argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
