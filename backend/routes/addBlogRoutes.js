import express from "express";
import { getAllBlog, getBlog, saveBlog, upload, updateLikes } from "../controllers/addBlogController.js";
const router = express.Router();

router.post("/saveBlog", upload.single('featuredImage'), saveBlog);
router.get("/getAllBlog", getAllBlog);
router.patch("/updateLikes", updateLikes);
router.get("/getBlog/:id", getBlog);

export default router;
