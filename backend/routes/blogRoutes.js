import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blogController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { blogValidation } from "../validations/blogValidation.js";

const router = express.Router();

// Open routes
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

// Authenticated routes
router.post("/", authMiddleware, blogValidation, createBlog);
router.put("/:id", authMiddleware, blogValidation, updateBlog);

// Admin-only routes
router.delete("/:id", authMiddleware, adminMiddleware, deleteBlog);

export default router;
