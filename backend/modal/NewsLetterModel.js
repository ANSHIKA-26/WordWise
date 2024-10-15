/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");

// Define the schema for newsletter emails
const NewsletterEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Simple email validation
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Automatically set the date of subscription
  },
});

// Export the model
module.exports = mongoose.model("NewsletterEmail", NewsletterEmailSchema);
