import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

/**
 * Senior Developer Centralized Error Handler
 * Standardizes API error responses and logs structured diagnostic info.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with invalid identifier of ${err.value}`;
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  logger.error(`${req.method} ${req.originalUrl} - ${statusCode} - ${message}`, {
    ip: req.ip,
    user: req.user ? req.user._id : 'anonymous'
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
