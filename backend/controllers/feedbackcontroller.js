import feedback from "../models/feedback.js";

export async function saveFeedback(req, resp) {
  try {
    const { name, userfeedback, email, rating } = req.body;

    if (!name || !userfeedback || !email || typeof rating !== "number") {
      return resp.status(400).json({ message: "All fields are required." });
    }

    const newfeedback = new feedback({ name, userfeedback, email, rating });

    // Save feedback to the database
    await newfeedback.save();

    // Respond with success message
    resp
      .status(201)
      .json({ message: "Feedback saved successfully!", newfeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    resp.status(500).json({ message: "Failed to save feedback.", error });
  }
}
