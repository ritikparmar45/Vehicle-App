import cron from "node-cron";
import Booking from "../models/Booking.js";
import sendEmail from "../utils/mailer.js";

// Run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    console.log("⏰ Checking today's bookings...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Find all bookings for today
    const bookings = await Booking.find({
      appointmentDate: { $gte: today, $lt: tomorrow }
    }).populate("user", "name email");

    for (let booking of bookings) {
      if (!booking.user || !booking.user.email) continue;

      await sendEmail(
        booking.user.email,
        "Booking Reminder",
        `<h2>Hi ${booking.user.name || "Sir/Madam"},</h2>
         <p>Your booking is <b>today</b> at <b>${booking.appointmentTime}</b>.</p>
         <p>Please arrive on time with your ${booking.vehicleDetails.make} ${booking.vehicleDetails.model} 🚗✨</p>
         <br>
         <p>Thank you,<br/>Vehicle Maintenance System</p>`
      );
    }

    console.log(`✅ Sent reminders for ${bookings.length} bookings`);
  } catch (err) {
    console.error("❌ Error in booking reminder job:", err);
  }
});
