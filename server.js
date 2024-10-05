const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const upload = require("./middleware/multerConfig"); // Import multer config
const Blog = require("./model/DBmodel"); // Import Blog model
const cors = require('cors'); // Import CORS

require('dotenv').config(); // Ensure this is the first line




const app = express();

app.use(cors());

// Your other routes and middleware
app.use(express.json());


// Connect to MongoDB without deprecated options]

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files for image uploads
app.use('/uploads', express.static('uploads')); // To serve images statically

// Handle fetching all blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blogs
        res.status(200).json(blogs); // Send them back as JSON
    } catch (err) {
        res.status(500).send('Error fetching blogs');
    }
});

app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).send('Error fetching blog');
    }
});



// Handle creating a new blog post with an image
app.post('/create', upload.single('image'), async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            image: req.file ? req.file.path : null // Store the path to the uploaded image
        });

        await newBlog.save(); // Save the blog post in the database

        // Send success response with 201 status code and a JSON message
        res.status(201).json({ message: 'Blog post created successfully!' });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Failed to create blog post' });
    }
});



// Handle updating a blog by ID
// app.put('/blogs/:id', upload.single('image'), async (req, res) => {
//     try {
//         const blogId = req.params.id;
//         const updatedData = {
//             title: req.body.title,
//             shortDescription: req.body.shortDescription,
//             content: req.body.content,
//         };

//         // Check if a new image was uploaded, if so, update the image path
//         if (req.file) {
//             updatedData.image = req.file.path;
//         }

//         // Find the blog by ID and update it with the new data
//         const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

//         if (!updatedBlog) {
//             return res.status(404).send('Blog post not found');
//         }

//         res.status(200).send('Blog post updated successfully');
//     } catch (err) {
//         console.error('Error updating blog post:', err);
//         res.status(500).send('Error updating blog post');
//     }
// });


// Route to handle updating a blog post, including image upload
app.put('/blogs/:id', upload.single('image'), async (req, res) => {
    try {
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
        };

        // Check if a new image was uploaded, if so, update the image path
        if (req.file) {
            updatedData.image = req.file.path;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedBlog) {
            return res.status(404).send('Blog post not found');
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).send('Failed to update blog post');
    }
});

// Handle deleting a blog by ID
app.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.status(200).send('Blog deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting blog');
    }
});




// Start the server
app.listen(3000, () => {
    console.log("Server running at port 3000");
});
