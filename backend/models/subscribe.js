import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

export default Subscribe;
