import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import getInTouch from "./routes/getInTouchRoutes.js";
import addBlog from "./routes/addBlogRoutes.js";
import cors from "cors";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Import fileURLToPath

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

// to avoid cross-origin error
app.use(cors());

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Adjust path as necessary

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/getInTouch", getInTouch);
app.use("/api/addBlog", addBlog);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
