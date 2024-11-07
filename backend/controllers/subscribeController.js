import Suscribe from "../models/subscribe.js";
import { sendMailToSubscriber } from "../utils/sendMailToSubscribe.js";
export async function saveSubsribe(req, res) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create new contact document
        const newSuscribe = new Suscribe({ name, email });
        sendMailToSubscriber(newSuscribe)
        await newSuscribe.save();
        res
            .status(201)
            .json({ message: "Contact form submitted successfully!", newSuscribe });
    } catch (error) {
        console.error("Error saving contact form:", error);
        res.status(500).json({ message: "Failed to submit contact form.", error });
    }
}

export async function getSubscribe(req, res) {
    res.send('hello subscriber')
}
