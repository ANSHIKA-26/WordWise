const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST route for handling contact form submission
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',    // Replace with your email
            pass: 'your-password'            // Replace with your password
        }
    });

    // Set up email options
    const mailOptions = {
        from: email,
        to: 'admin@example.com',           // Replace with admin's email
        subject: `Contact Us Message from ${name}`,
        text: message
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send the message" });
    }
});

module.exports = router;

