import express from "express";
import { getAllBlog, getBlog, saveBlog, upload } from "../controllers/addBlogController.js";
const router = express.Router();

router.post("/saveBlog", upload.single('featuredImage'), saveBlog);
router.get("/getAllBlog", getAllBlog);
router.get("/getBlog/:id", getBlog);

export default router;
