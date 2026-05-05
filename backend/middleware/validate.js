import { validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * Middleware to handle validation results from express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => err.msg).join(', ');
    return next(new ErrorResponse(message, 400));
  }
  next();
};

