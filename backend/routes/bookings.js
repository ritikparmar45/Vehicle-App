import express from 'express';
import { body } from 'express-validator';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getBookings,
  createBooking,
  updateBookingStatus,
  assignMechanic,
  getBookingById
} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', authenticateToken, getBookings);

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
  createBooking
);

router.patch('/:id/status', authenticateToken, updateBookingStatus);

router.patch(
  '/:id/assign-mechanic',
  authenticateToken,
  authorizeRoles('admin'),
  assignMechanic
);

router.get('/:id', authenticateToken, getBookingById);

export default router;
