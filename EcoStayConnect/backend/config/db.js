const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Warning: ${error.message}`);
    console.warn('Backend server running in fallback (in-memory) mode.');
  }
};

module.exports = connectDB;
