import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import { logger } from './utils/logger.js';

import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import editProfileRoute from './routes/editprofile.js';
import receiptRoutes from './routes/receipts.js';
import vehicleRoutes from './routes/vehicles.js';
import mailRoutes from './routes/mail.js';

import errorHandler from './middleware/errorHandler.js';
import "./jobs/bookingReminder.js";

const app = express();

// Security & Logging Middleware
app.use(helmet());
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api/', limiter);

// Dynamic CORS configuration
const allowedOrigins = [
  'https://vehicle-app-seven.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy violation: Origin blocked'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', { error: error.message });
    process.exit(1);
  }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/edit-profile', editProfileRoute);
app.use('/api/receipts', receiptRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/mail', mailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Vehicle Service Booking API is online & operational',
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV
  });
});

// Centralized Error Handling (MUST BE LAST)
app.use(errorHandler);

// Start Server & Handle Graceful Shutdown
const server = app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on port ${env.PORT} in [${env.NODE_ENV}] mode`);
});

const handleShutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed. Server terminated cleanly.');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
