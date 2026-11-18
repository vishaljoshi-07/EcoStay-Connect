const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

// Load environment variables - search backend/.env first, then root .env
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Default fallbacks
process.env.PORT = process.env.PORT || 5000;
process.env.JWT_SECRET = process.env.JWT_SECRET || 'ecostay_connect_jwt_secret_key_2026_super_secure';

// Database connection
const connectDB = require('./config/db');
connectDB();

// Passport Config (safe, won't throw if clientID is missing)
require('./config/passport');

// Routes
const homestayRoutes = require('./routes/homestayRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Error Middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(passport.initialize());

// API Routes
app.use('/api/homestays', homestayRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Base health route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EcoStay Connect API',
    version: '2.0.0',
    services: {
      auth: 'JWT Authentication',
      ai: 'Google Gemini 1.5 Flash',
      database: global.isMongoConnected ? 'MongoDB Atlas' : 'Local JSON Persistent Database'
    },
    status: 'Running'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `🚀 EcoStay Backend API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`   Health check endpoint: http://localhost:${PORT}/`);
});
