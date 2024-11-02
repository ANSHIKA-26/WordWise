import BlogPost from '../models/addBlog.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        // Set the file name to be unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Preserve the original file extension
    }
});

const upload = multer({ storage: storage });

// Function to save a new blog post
export async function saveBlog(req, res) {
    try {
        const { title, category, summary, excerpt, tags, publish, featuredImage } = req.body;

        // If an image is uploaded, use its path
        let imagePath = req.file ? req.file.path : null;

        // Handle base64 image if provided
        if (featuredImage && featuredImage.startsWith('data:image/')) {
            // Extract the base64 part of the image data
            const base64Image = featuredImage.split(';base64,').pop();
            // Convert base64 string to Buffer
            const buffer = Buffer.from(base64Image, 'base64');

            // Create a path to save the image
            const imagePathFromBase64 = `uploads/${Date.now()}.png`; // Use a unique name based on timestamp

            // Save the image buffer to a file
            await fs.promises.writeFile(imagePathFromBase64, buffer);
            imagePath = imagePathFromBase64; // Set imagePath to the saved file path
        }

        // Log request body and file info


        // Check if required fields are provided
        if (!title || !category || !summary || !excerpt) {
            return res.status(400).json({ message: "All required fields must be filled out." });
        }

        // Create a new blog document
        const newBlog = new BlogPost({
            title,
            category,
            summary,
            excerpt,
            tags,
            publish,
            featuredImage: imagePath // Use the determined image path
        });

        console.log(newBlog);

        // Save the blog post to the database
        await newBlog.save();

        // Respond with success message
        res.status(201).json({
            message: "Blog post created successfully!",
            data: newBlog
        });
    } catch (error) {
        console.error("Error saving blog post:", error);
        res.status(500).json({ message: "Failed to create blog post.", error });
    }
}


// Function to retrieve all blog posts
export async function getAllBlog(req, res) {
    try {
        const blogs = await BlogPost.find(); // Retrieve all blog posts
        res.status(200).json(blogs); // Respond with the list of blog posts
    } catch (error) {
        console.error("Error retrieving blog posts:", error);
        res.status(500).json({ message: "Failed to retrieve blog posts.", error });
    }
}

// Function to retrieve a specific blog post by ID
export async function getBlog(req, res) {
    try {
        const { id } = req.params;

        // Retrieve the specific blog post by ID
        const blog = await BlogPost.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found." });
        }
        return res.status(200).json(blog);
    } catch (error) {
        console.error("Error retrieving blog post:", error);
        res.status(500).json({ message: "Failed to retrieve blog post.", error });
    }
}

export { upload };