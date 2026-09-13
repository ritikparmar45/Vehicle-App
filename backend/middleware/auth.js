import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import ErrorResponse from '../utils/errorResponse.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(new ErrorResponse('Access token required for authorization', 401));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return next(new ErrorResponse('User associated with token no longer exists', 401));
    }

    if (!user.isActive) {
      return next(new ErrorResponse('User account is currently deactivated', 403));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Invalid or expired authentication token', 403));
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse(`Access denied: Required role level [${roles.join(', ')}]`, 403));
    }
    next();
  };
};