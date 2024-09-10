const Blog = require('../models/blog.model');



// Fetch all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single blog by ID
const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).send('Error fetching blog');
    }
};


module.exports = {
    getBlogs,
    getBlog,
};
