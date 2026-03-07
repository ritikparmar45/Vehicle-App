// backend/utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // Gmail account
    pass: process.env.EMAIL_PASS,   // 16-char Gmail App Password
  },
});

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Booking System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
}

export default sendEmail;
