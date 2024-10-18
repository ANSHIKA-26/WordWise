import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
