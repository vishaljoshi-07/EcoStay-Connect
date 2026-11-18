const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
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
    ownerName: 'Sunita Sharma',
    availability: true
  }
];

const seedLocalFile = async () => {
  const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');
  const salt = await bcrypt.genSalt(10);
  
  const seededUsers = await Promise.all(users.map(async (u, idx) => ({
    _id: `64a00000000000000000010${idx + 1}`,
    name: u.name,
    email: u.email,
    password: await bcrypt.hash(u.password, salt),
    role: u.role,
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    savedHomestays: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })));

  const seededHomestays = homestays.map((h, idx) => ({
    _id: `64a00000000000000000000${idx + 1}`,
    title: h.title,
    name: h.title,
    location: h.location,
    ecoFeatures: h.ecoFeatures,
    sustainabilityTags: h.ecoFeatures,
    description: h.description,
    image: h.image,
    price: h.price,
    rating: h.rating,
    reviewsCount: h.reviewsCount,
    ownerName: h.ownerName,
    availability: h.availability,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  const seededBookings = [
    {
      _id: '64a000000000000000000201',
      customerName: 'Traveler Eco User',
      email: 'traveler@ecostay.org',
      homestayId: seededHomestays[0]._id,
      checkIn: new Date(Date.now() + 86400000 * 2).toISOString(),
      checkOut: new Date(Date.now() + 86400000 * 5).toISOString(),
      guests: 2,
      bookingStatus: 'Confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const dbData = {
    users: seededUsers,
    homestays: seededHomestays,
    bookings: seededBookings
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
    console.log(`[LocalDB Seeder] Saved to ${DB_FILE}`);
  } catch (err) {
    console.log(`[LocalDB Seeder] Seeded in memory.`);
  }

  console.log(`🌿 Seeded ${seededUsers.length} Users, ${seededHomestays.length} Homestays, and ${seededBookings.length} Bookings to Local Database.`);
};

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    // Check if remote MongoDB is available
    if (mongoUri && !mongoUri.includes('username:password') && !mongoUri.includes('ecostayadmin:MyPassword123')) {
      try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
        console.log(`Connected to MongoDB Atlas: ${mongoUri}`);

        await Booking.deleteMany({});
        await Homestay.deleteMany({});
        await User.deleteMany({});

        const seededUsers = await User.insertMany(users);
        console.log(`${seededUsers.length} Users seeded into MongoDB.`);

        const seededHomestays = await Homestay.insertMany(homestays);
        console.log(`${seededHomestays.length} Homestays seeded into MongoDB.`);

        const bookingList = [
          {
            customerName: 'Traveler Eco User',
            email: 'traveler@ecostay.org',
            homestayId: seededHomestays[0]._id,
            checkIn: new Date(Date.now() + 86400000 * 2),
            checkOut: new Date(Date.now() + 86400000 * 5),
            guests: 2,
            bookingStatus: 'Confirmed'
          }
        ];

        const seededBookings = await Booking.insertMany(bookingList);
        console.log(`${seededBookings.length} Bookings seeded into MongoDB.`);

        console.log('MongoDB seeded successfully.');
        process.exit(0);
      } catch (err) {
        console.log(`MongoDB connection failed (${err.message}). Seeding Local Database instead...`);
      }
    }

    await seedLocalFile();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (mongoUri) {
      try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
        await Booking.deleteMany({});
        await Homestay.deleteMany({});
        await User.deleteMany({});
        console.log('All data deleted from MongoDB.');
      } catch (e) {}
    }

    const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');
    if (fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], homestays: [], bookings: [] }, null, 2));
      console.log('Local database cleared.');
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
