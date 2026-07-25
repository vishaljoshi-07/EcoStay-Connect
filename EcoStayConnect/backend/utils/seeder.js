const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Homestay = require('../models/homestayModel');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config({ path: './.env' });

const homestays = [
  {
    title: 'The Whispering Pines Sanctuary',
    location: 'Manali, Himachal Pradesh',
    ecoFeatures: ['Solar Powered', 'Rainwater Harvesting', 'Zero Single-Use Plastic'],
    description: 'A serene wooden cabin nestled among towering pine trees, offering panoramic Himalayan views and a fully eco-conscious living experience.',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    price: 3500,
    rating: 4.9,
    reviewsCount: 48
  },
  {
    title: 'Emerald Valley Bamboo Retreat',
    location: 'Wayanad, Kerala',
    ecoFeatures: ['Local Materials', 'Organic Farming', 'Compost Systems'],
    description: 'Stay in an architectural marvel built entirely from locally sourced bamboo. Experience living in harmony with nature in the heart of the Western Ghats.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    price: 4200,
    rating: 4.8,
    reviewsCount: 36
  },
  {
    title: 'Cloud-Kissed Mud Haven',
    location: 'Coorg, Karnataka',
    ecoFeatures: ['Bio Gas', 'Farm-to-Table Dining', 'Energy Efficient'],
    description: 'Hand-built mud cottage surrounded by lush coffee plantations. Offers farm-to-table dining, local bird watching guide, and carbon-neutral stays.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    price: 2800,
    rating: 4.7,
    reviewsCount: 29
  },
  {
    title: 'Himalayan Stone Eco-Cottage',
    location: 'Almora, Uttarakhand',
    ecoFeatures: ['Recycled Water', 'Zero Waste Policy', 'Cultural Heritage'],
    description: 'Reconstructed vintage stone house utilizing traditional hill architecture. Enjoy stargazing, fresh mountain spring water, and locally guided treks.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    price: 3100,
    rating: 4.9,
    reviewsCount: 42
  },
  {
    title: 'Ganges Edge Mud Retreat',
    location: 'Rishikesh, Uttarakhand',
    ecoFeatures: ['Solar Energy', 'Vegan Kitchen', 'Natural Cooling'],
    description: 'Eco-friendly cottages close to the Ganga riverbank. Focuses on yoga, organic herbal gardens, and absolute low-impact, peaceful living.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    price: 2500,
    rating: 4.6,
    reviewsCount: 18
  },
  {
    title: 'Teakwood Forest Bungalow',
    location: 'Shimla, Himachal Pradesh',
    ecoFeatures: ['Rain Harvesting', 'LED Smart Lighting', 'Local Support'],
    description: 'Experience old-world charm in a colonial-style bungalow managed with modern sustainability standards in deep cedar woods.',
    image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80',
    price: 3800,
    rating: 4.8,
    reviewsCount: 31
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecostay_connect';
    await mongoose.connect(mongoUri);
    console.log('Database connected for seeding.');

    await Homestay.deleteMany({});
    console.log('Existing Homestays deleted.');

    await Homestay.insertMany(homestays);
    console.log('Sample Homestays seeded successfully.');

    process.exit();
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecostay_connect';
    await mongoose.connect(mongoUri);
    await Homestay.deleteMany({});
    console.log('All Homestays deleted from database.');
    process.exit();
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
