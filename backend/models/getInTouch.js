// Import Mongoose
import mongoose from 'mongoose';

// Define the schema for the form data
const getInTouchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model from the schema
const GetInTouch = mongoose.model('GetInTouch', getInTouchSchema);

// Export the model as the default export
export default GetInTouch;
