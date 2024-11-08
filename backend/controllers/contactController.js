import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

export async function saveContact(req, resp) {
  try {
    const { name, email, subject, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !subject || !message) {
      return resp.status(400).json({ message: "All fields are required." });
    }

    // Create new contact document
    const newContact = new Contact({ name, email, subject, message });

    // Save contact form data to the database
    await newContact.save();

    // Respond with success message
    resp
      .status(201)
      .json({ message: "Contact form submitted successfully!", newContact });
  } catch (error) {
    console.error("Error saving contact form:", error);
    resp.status(500).json({ message: "Failed to submit contact form.", error });
  }
}

export async function getContact(req, resp) {
  resp.send("hello contact");
}

export async function newsletter(req, resp) {
  try {
    const { email } = req.body;

    if (!email) {
      return resp.status(400).json({ message: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "taskmaster991@gmail.com",
        pass: "kmepakzcabvztekd",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for Subscribing to WORDWISE",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
            <!-- Header -->
            <div style="padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom: 1px solid #e0e0e0;">
            <h3 style="color: #000; margin: 0;">WordWise</h3>
              <h1 style="color: #000; margin: 0;">Welcome to Our Newsletter</h1>
            </div>
  
            <!-- Body Content -->
            <div style="padding: 20px; text-align: center;">
              <h2 style="color: #007BFF;">Thank You for Subscribing!</h2>
              <p>Dear Subscriber,</p>
              <p>We are thrilled to have you with us. Stay tuned for our latest updates, offers, and insights to keep you informed and inspired!</p>
  
              <!-- Button -->
              <div style="margin-top: 20px;">
                <a href="https://anshika-26.github.io/WordWise/" 
                   style="display: inline-block; padding: 12px 25px; background-color: #007BFF; color: white; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px;">
                  Discover More
                </a>
              </div>
            </div>
  
            <!-- Footer -->
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="font-size: 14px; color: #666;">Best Regards,<br><strong>WORDWISE Team</strong></p>
              <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} WORDWISE. All rights reserved.</p>
            </div>
          </div>
        `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    resp.status(200).json({ message: "Newsletter email sent successfully!" });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    resp.status(500).json({ message: "Error sending newsletter" });
  }
}
