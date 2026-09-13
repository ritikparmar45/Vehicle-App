import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { register, login, getMe } from '../controllers/authController.js';

const router = express.Router();

// ---------------------- REGISTER ----------------------
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').trim().isLength({ min: 10 }).withMessage('Please provide a valid phone number'),
    validate
  ],
  register
);

// ---------------------- LOGIN ----------------------
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required'),
    validate
  ],
  login
);

// ---------------------- GET CURRENT USER ----------------------
router.get('/me', authenticateToken, getMe);

export default router;
