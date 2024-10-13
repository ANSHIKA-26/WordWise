const { sendContactConfirmation } = require("../config/nodemailer");
const Contact = require("../modal/ContactModel");

exports.saveContactForm = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    // Create a new contact document
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    // Save to the database
    await contact.save();
    await sendContactConfirmation(email,firstName);

    // Respond with success message
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving contact form", details: error });
  }
};
