import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import { env } from '../config/env.js';

export class AuthService {
  static async registerUser(userData) {
    const { name, email, password, phone, role, address } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorResponse('User already exists with this email', 400);
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      role: role || 'user',
      address
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt
      }
    };
  }

  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new ErrorResponse('Account is deactivated', 403);
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    };
  }

  static async getCurrentUser(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new ErrorResponse('User not found', 404);
    }
    return user;
  }
}
