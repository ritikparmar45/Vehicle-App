import express from 'express';
import { body } from 'express-validator';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/mailer.js';

const router = express.Router();

/**
 * @desc    Get all bookings (filtered by role)
 * @route   GET /api/bookings
 * @access  Private
 */
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    let filter = {};
    const { status } = req.query;

    if (status) filter.status = status;

    if (req.user.role === 'user') {
      filter.user = req.user._id;
    } else if (req.user.role === 'mechanic') {
      filter.mechanic = req.user._id;
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('service', 'name description price duration')
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
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
router.post(
  '/',
  authenticateToken,
  [
    body('service').isMongoId().withMessage('Valid service ID is required'),
    body('vehicleDetails.type').isIn(['car', 'bike']).withMessage('Vehicle type must be car or bike'),
    body('vehicleDetails.make').notEmpty().withMessage('Vehicle make is required'),
    body('vehicleDetails.model').notEmpty().withMessage('Vehicle model is required'),
    body('vehicleDetails.year').isInt({ min: 1900 }).withMessage('Valid year is required'),
    body('vehicleDetails.licensePlate').notEmpty().withMessage('License plate is required'),
    body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
    body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
    validate
  ],
  async (req, res, next) => {
    try {
      const { service: serviceId, vehicleDetails, appointmentDate, appointmentTime, notes } = req.body;

      const service = await Service.findById(serviceId);
      if (!service) {
        return next(new ErrorResponse('Service catalog entry not found', 404));
      }

      const selectedDate = new Date(appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return next(new ErrorResponse('Operational window must be in the future', 400));
      }

      const booking = await Booking.create({
        user: req.user._id,
        service: serviceId,
        vehicleDetails,
        appointmentDate,
        appointmentTime,
        notes,
        totalAmount: service.price
      });

      await booking.populate([
        { path: 'user', select: 'name email phone' },
        { path: 'service', select: 'name description price duration' }
      ]);

      // Send confirmation email
      if (booking.user && booking.user.email) {
        const emailHtml = `
          <h2>Booking Confirmed!</h2>
          <p>Hi ${booking.user.name},</p>
          <p>Your service booking for <b>${booking.service.name}</b> has been received.</p>
          <p><b>Date:</b> ${new Date(booking.appointmentDate).toLocaleDateString()}</p>
          <p><b>Time:</b> ${booking.appointmentTime}</p>
          <p><b>Vehicle:</b> ${booking.vehicleDetails.make} ${booking.vehicleDetails.model}</p>
          <br>
          <p>Thank you for choosing AutoCare!</p>
        `;
        await sendEmail(booking.user.email, "Booking Confirmation - AutoCare", emailHtml);
      }

      res.status(201).json({
        success: true,
        message: 'Booking sequence initiated successfully',
        booking
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc    Update booking status
 * @route   PATCH /api/bookings/:id/status
 * @access  Private
 */
router.patch('/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    const validStatuses = ['pending', 'approved', 'rejected', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return next(new ErrorResponse('Invalid operational status provided', 400));
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return next(new ErrorResponse('Booking record not found', 404));
    }

    // Access Control Logic
    if (req.user.role === 'user') {
      if (booking.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse('Access denied: Unauthorized operation', 403));
      }
      if (status !== 'cancelled') {
        return next(new ErrorResponse('Standard users may only initialize cancellation', 403));
      }
    }

    booking.status = status;
    await booking.save();

    await booking.populate([
      { path: 'user', select: 'name email phone' },
      { path: 'service', select: 'name description price duration' },
      { path: 'mechanic', select: 'name email phone' }
    ]);

    res.status(200).json({
      success: true,
      message: 'Status synchronization complete',
      booking
    });

    // Send status update email asynchronously
    if (booking.user && booking.user.email) {
      const statusHtml = `
        <h2>Booking Status Update</h2>
        <p>Hi ${booking.user.name},</p>
        <p>The status of your booking for <b>${booking.service.name}</b> has been updated to: <b>${status.toUpperCase()}</b>.</p>
        <p><b>Vehicle:</b> ${booking.vehicleDetails.make} ${booking.vehicleDetails.model}</p>
        <br>
        <p>You can check more details in your dashboard.</p>
        <p>Thank you,<br/>AutoCare Team</p>
      `;
      sendEmail(booking.user.email, `Booking Status Updated: ${status.toUpperCase()}`, statusHtml);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Assign mechanic (admin only)
 * @route   PATCH /api/bookings/:id/assign-mechanic
 * @access  Private (Admin)
 */
router.patch(
  '/:id/assign-mechanic',
  authenticateToken,
  authorizeRoles('admin'),
  async (req, res, next) => {
    try {
      const { mechanicId } = req.body;
      const bookingId = req.params.id;

      const mechanic = await User.findOne({ _id: mechanicId, role: 'mechanic' });
      if (!mechanic) {
        return next(new ErrorResponse('Specified mechanic resource not found', 404));
      }

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { mechanic: mechanicId },
        { new: true, runValidators: true }
      ).populate([
        { path: 'user', select: 'name email phone' },
        { path: 'service', select: 'name description price duration' },
        { path: 'mechanic', select: 'name email phone' }
      ]);

      if (!booking) {
        return next(new ErrorResponse('Booking record not found', 404));
      }

      res.status(200).json({
        success: true,
        message: 'Resource allocation successful: Mechanic assigned',
        booking
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc    Get single booking by ID
 * @route   GET /api/bookings/:id
 * @access  Private
 */
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('service', 'name description price duration')
      .populate('mechanic', 'name email phone');

    if (!booking) {
      return next(new ErrorResponse('Booking record not found', 404));
    }

    const canAccess =
      req.user.role === 'admin' ||
      booking.user._id.toString() === req.user._id.toString() ||
      (booking.mechanic && booking.mechanic._id.toString() === req.user._id.toString());

    if (!canAccess) {
      return next(new ErrorResponse('Access denied: Unauthorized request', 403));
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
});

export default router;
