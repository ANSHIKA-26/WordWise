import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import getInTouch from "./routes/getInTouchRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

// to avoid cross origin errror
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/getInTouch", getInTouch);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
