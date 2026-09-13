import { BookingService } from '../services/bookingService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingService.getBookings(req.user, req.query.status);
  res.status(200).json({
    success: true,
    count: bookings.length,
    bookings
  });
});

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await BookingService.createBooking(req.user, req.body);
  res.status(201).json({
    success: true,
    message: 'Booking sequence initiated successfully',
    booking
  });
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await BookingService.updateStatus(req.user, req.params.id, req.body.status);
  res.status(200).json({
    success: true,
    message: 'Status synchronization complete',
    booking
  });
});

export const assignMechanic = asyncHandler(async (req, res) => {
  const booking = await BookingService.assignMechanic(req.params.id, req.body.mechanicId);
  res.status(200).json({
    success: true,
    message: 'Resource allocation successful: Mechanic assigned',
    booking
  });
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await BookingService.getBookingById(req.user, req.params.id);
  res.status(200).json({
    success: true,
    booking
  });
});
