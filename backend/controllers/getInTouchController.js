// Import the GetInTouch model
import GetInTouch from '../models/getInTouch.js';

// Controller function to handle form submission
export const submitGetInTouch = async (req, res) => {
    try {
        // Create a new GetInTouch document using request data
        const { name, email, message } = req.body;

        // Validate request data
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newMessage = new GetInTouch({
            name,
            email,
            message,
        });

        // Save the new document to the database
        await newMessage.save();

        // Send a success response
        res.status(201).json({ message: 'Thank you! Your message has been received.' });
    } catch (error) {
        // Handle errors
        console.error('Error submitting message:', error);
        res.status(500).json({ error: 'There was an error submitting your message. Please try again.' });
    }
};
