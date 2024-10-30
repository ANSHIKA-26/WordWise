import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

export const createBlog = async (req, res) => {
  try {
    const { title, topic, image, content, author } = req.body;
    const newBlog = new Blog({ title, topic, image, content, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveComment = async (req, resp) => {
  try {
    const { name, comment } = req.body;

    if (!name || !comment) {
      return resp.status(400).send({
        message: "all fields are required",
        success: false,
      });
    }

    const newcomment = await new Comment({
      name: name,
      comment: comment,
    });

    newcomment.save();

    if (newcomment) {
      return resp.status(200).send({
        success: true,
        message: "new comment added",
        newcomment,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "internal server error",
      error,
    });
  }
};
