import { AuthService } from '../services/authService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const result = await AuthService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    ...result
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUser(email, password);
  res.json({
    success: true,
    message: 'Login successful',
    ...result
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await AuthService.getCurrentUser(req.user._id);
  res.json({
    success: true,
    user
  });
});
