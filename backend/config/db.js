const mongoose = require('mongoose');
const { localDbInstance } = require('./localDb');

let isConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  // If using placeholder/demo credentials or empty URI, immediately use local persistent DB
  if (!mongoUri || mongoUri.includes('username:password') || mongoUri.includes('ecostayadmin:MyPassword123')) {
    console.log(`\x1b[32m%s\x1b[0m`, `🌿 [ECOSTAY DATABASE] Running with Local Persistent Database (backend/data/db.json)`);
    console.log(`\x1b[36m%s\x1b[0m`, `   - Auto-seeded with eco-homestays & demo accounts`);
    console.log(`   - All user registrations & bookings are saved to backend/data/db.json & printed to console.`);
    global.isMongoConnected = false;
    return;
  }

  try {
    const connectPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out after 2500ms')), 2500)
    );

    const conn = await Promise.race([connectPromise, timeoutPromise]);

    isConnected = true;
    global.isMongoConnected = true;
    console.log(`\x1b[32m%s\x1b[0m`, `MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    global.isMongoConnected = false;
    console.log(`\x1b[33m%s\x1b[0m`, `[Database Notice] MongoDB remote connection unavailable (${error.message}).`);
    console.log(`\x1b[32m%s\x1b[0m`, `🌿 [ECOSTAY DATABASE ACTIVE] Running with Local Persistent Database (backend/data/db.json)`);
    console.log(`\x1b[36m%s\x1b[0m`, `   - Auto-seeded with eco-homestays & demo accounts`);
    console.log(`   - All user registrations & bookings are saved to backend/data/db.json & printed to console.`);
  }
};

module.exports = connectDB;
