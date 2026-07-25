const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('Error: MongoDB URI is not defined in environment variables.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`\x1b[32m%s\x1b[0m`, `MongoDB Atlas Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `Database Connection Failure: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
