// controllers/feedbackController.js

import Rating from '../models/rating.js';
import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example with Gmail, customize as needed
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const saveRating = async (req, res) => {
  const { name, email, message, rating } = req.body;

  try {
    // Save feedback to the database
    const feedback = new Rating({ name, email, message, rating });
    await feedback.save();

    // Send confirmation email to the user
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Thank you for your feedback!',
      text: `Dear ${name},\n\nThank you for your valuable feedback!\n\nYour Feedback:\n"${message}"\n\nRating: ${rating} stars\n\nBest regards,\nYour Company`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Feedback saved but failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Feedback saved and email sent successfully!' });
      }
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to save feedback' });
  }
};

export default saveRating