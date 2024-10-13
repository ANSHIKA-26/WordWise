require("dotenv").config();
const nodemailer = require("nodemailer");


// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send newsletter subscription confirmation via email
exports.sendSubscriptionConfirmation = async (email) => {
    // Construct the email content
    const emailText = `
    Dear Customer,
    
    Thank you for subscribing to the WordWise newsletter!
    We're thrilled to welcome you to our community of passionate writers and language enthusiasts.

    If you have any questions or feedback, feel free to reach out.

    Best regards,
    WordWise Team
  `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Subscribing!",
            text: emailText,
        });

    } catch (error) {

        if (error.code === "ECONNREFUSED") {
            throw new Error(
                "Failed to connect to email server. Please try again later.",
            );
        } else {
            throw new Error(
                `Failed to send subscription confirmation email: ${error.message}`,
            );
        }
    }
};

// Function to send a thank you email for contacting us
exports.sendContactConfirmation = async (email, firstName) => {
    // Construct the email content
    const emailText = `
    Dear ${firstName},

    Thank you for reaching out to us!
    We appreciate you contacting WordWise. Our team is currently reviewing your message, and we will get back to you as soon as possible.

    If you have any urgent queries, please don't hesitate to contact us again.

    Best regards,
    WordWise Team
  `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Contacting Us!",
            text: emailText,
        });

    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            throw new Error(
                "Failed to connect to email server. Please try again later.",
            );
        } else {
            throw new Error(
                `Failed to send contact confirmation email: ${error.message}`,
            );
        }
    }
};