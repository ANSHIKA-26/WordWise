import Feedback from "../models/feedback.js";

// Controller to handle feedback submission
export async function submitFeedback(req, res) { // Changed resp to res
    console.log('feedback form getting submit')
    try {
        // Extract feedback data from the request body
        const {
            overallExperience,
            featuresUsed,
            mostHelpfulFeature,
            improvement,
            newFeatures,
            recommendation,
            additionalComments
        } = req.body;

        // Validate required fields
        if (!overallExperience || !featuresUsed || !mostHelpfulFeature || !recommendation) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Create a new Feedback instance with the extracted data
        const feedback = new Feedback({
            overallExperience,
            featuresUsed,
            mostHelpfulFeature,
            improvement,
            newFeatures,
            recommendation,
            additionalComments
        });

        // Save the feedback data to MongoDB
        await feedback.save();

        // Respond with a success message
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        // Handle errors and send a failure response
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
    }
}


export async function getFeed(req, res) {
    res.send("feedback form")
}