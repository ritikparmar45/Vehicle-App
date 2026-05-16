import express from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/mailer.js';

const router = express.Router();

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private (Admin)
 */
router.get('/stats', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
    const bookingsCount = await Booking.countDocuments();
    const servicesCount = await Service.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingsToday = await Booking.countDocuments({ createdAt: { $gte: today } });

    res.status(200).json({
      success: true,
      data: {
        users: usersCount,
        bookings: bookingsCount,
        services: servicesCount,
        bookingsToday
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get all registered users
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
router.get('/users', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Block/Deactivate user account
 * @route   PATCH /api/admin/users/:id/block
 * @access  Private (Admin)
 */
router.patch('/users/:id/block', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    
    if (!user) {
      return next(new ErrorResponse('Target user identity not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Account deactivation protocol successful',
      user
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Unblock/Activate user account
 * @route   PATCH /api/admin/users/:id/unblock
 * @access  Private (Admin)
 */
router.patch('/users/:id/unblock', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
    
    if (!user) {
      return next(new ErrorResponse('Target user identity not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Account activation sequence complete',
      user
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/admin/users/:id
 * @access  Private (Admin)
 */
router.delete('/users/:id', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return next(new ErrorResponse('Target user identity not found for deletion', 404));
    }

    res.status(200).json({
      success: true,
      message: 'User identity purged from system'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get all bookings with full population
 * @route   GET /api/admin/bookings
 * @access  Private (Admin)
 */
router.get('/bookings', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'name category price')
      .populate('mechanic', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Update booking status (Admin override)
 * @route   PATCH /api/admin/bookings/:id/status
 * @access  Private (Admin)
 */
router.patch('/bookings/:id/status', authenticateToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'approved', 'in-progress', 'completed', 'cancelled', 'rejected'];

    if (!status || !allowed.includes(status.toLowerCase())) {
      return next(new ErrorResponse('Invalid operational status provided', 400));
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    )
    .populate('user', 'name email phone')
    .populate('service', 'name category price')
    .populate('mechanic', 'name email phone');

    if (!booking) {
      return next(new ErrorResponse('Booking record not found for synchronization', 404));
    }

    res.status(200).json({
      success: true,
      message: `System Matrix Updated: Booking marked as ${status}`,
      booking
    });

    // Notify user of admin update
    if (booking.user && booking.user.email) {
      const adminUpdateHtml = `
        <h2>Booking Update Notification</h2>
        <p>Hi ${booking.user.name},</p>
        <p>Your booking for <b>${booking.service.name}</b> has been updated by the administrator.</p>
        <p>New Status: <b>${status.toUpperCase()}</b></p>
        <br>
        <p>Thank you,<br/>AutoCare Management</p>
      `;
      sendEmail(booking.user.email, `Admin Update: Booking ${status.toUpperCase()}`, adminUpdateHtml);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
