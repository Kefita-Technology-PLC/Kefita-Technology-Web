const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog.model');
const { getBlogs, getBlog } = require('../controllers/blog.controller');

// Fetch all blogs
router.get('/', getBlogs);

// Fetch a single blog by ID
router.get('/:id', getBlog);


module.exports = router;
