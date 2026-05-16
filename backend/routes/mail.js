import express from 'express';
import sendEmail from '../utils/mailer.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import ErrorResponse from '../utils/errorResponse.js';

const router = express.Router();

/**
 * @desc    Send a contact email
 * @route   POST /api/mail/contact
 * @access  Public
 */
router.post(
  '/contact',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
    validate
  ],
  async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      const html = `
        <h2>New Contact Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `;

      await sendEmail(process.env.EMAIL_USER, `Contact Form: ${subject}`, html);

      res.status(200).json({
        success: true,
        message: 'Email transmitted successfully'
      });
    } catch (error) {
      next(new ErrorResponse('Failed to send email', 500));
    }
  }
);

export default router;
