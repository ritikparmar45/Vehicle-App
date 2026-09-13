import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/mailer.js';

export class BookingService {
  static async getBookings(user, queryStatus) {
    let filter = {};
    if (queryStatus) filter.status = queryStatus;

    if (user.role === 'user') {
      filter.user = user._id;
    } else if (user.role === 'mechanic') {
      filter.mechanic = user._id;
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('service', 'name description price duration')
      .populate('mechanic', 'name email phone')
      .sort({ createdAt: -1 })
      .lean();

    return bookings;
  }

  static async createBooking(user, bookingData) {
    const { service: serviceId, vehicleDetails, appointmentDate, appointmentTime, notes } = bookingData;

    const service = await Service.findById(serviceId);
    if (!service) {
      throw new ErrorResponse('Service catalog entry not found', 404);
    }

    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      throw new ErrorResponse('Operational window must be in the future', 400);
    }

    const booking = await Booking.create({
      user: user._id,
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
      sendEmail(booking.user.email, "Booking Confirmation - AutoCare", emailHtml).catch(console.error);
    }

    return booking;
  }

  static async updateStatus(user, bookingId, status) {
    const validStatuses = ['pending', 'approved', 'rejected', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new ErrorResponse('Invalid operational status provided', 400);
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new ErrorResponse('Booking record not found', 404);
    }

    if (user.role === 'user') {
      if (booking.user.toString() !== user._id.toString()) {
        throw new ErrorResponse('Access denied: Unauthorized operation', 403);
      }
      if (status !== 'cancelled') {
        throw new ErrorResponse('Standard users may only initialize cancellation', 403);
      }
    }

    booking.status = status;
    await booking.save();

    await booking.populate([
      { path: 'user', select: 'name email phone' },
      { path: 'service', select: 'name description price duration' },
      { path: 'mechanic', select: 'name email phone' }
    ]);

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
      sendEmail(booking.user.email, `Booking Status Updated: ${status.toUpperCase()}`, statusHtml).catch(console.error);
    }

    return booking;
  }

  static async assignMechanic(bookingId, mechanicId) {
    const mechanic = await User.findOne({ _id: mechanicId, role: 'mechanic' });
    if (!mechanic) {
      throw new ErrorResponse('Specified mechanic resource not found', 404);
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
      throw new ErrorResponse('Booking record not found', 404);
    }

    return booking;
  }

  static async getBookingById(user, bookingId) {
    const booking = await Booking.findById(bookingId)
      .populate('user', 'name email phone')
      .populate('service', 'name description price duration')
      .populate('mechanic', 'name email phone');

    if (!booking) {
      throw new ErrorResponse('Booking record not found', 404);
    }

    const canAccess =
      user.role === 'admin' ||
      booking.user._id.toString() === user._id.toString() ||
      (booking.mechanic && booking.mechanic._id.toString() === user._id.toString());

    if (!canAccess) {
      throw new ErrorResponse('Access denied: Unauthorized request', 403);
    }

    return booking;
  }
}
