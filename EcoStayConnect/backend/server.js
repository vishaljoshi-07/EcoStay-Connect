const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const homestayRoutes = require('./routes/homestayRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests from React frontend
app.use(express.json()); // Body parser for JSON payloads

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/homestays', homestayRoutes);

// Base route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EcoStay Connect API',
    version: '1.0.0',
    status: 'Running'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
