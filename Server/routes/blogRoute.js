const express = require('express');
const router = express.Router();
const Blog = require('../models/Blogs');
const upload =require('../utils/cloudinary')
const auth=require('../middleware/authMiddleware')





// Create Blog Route
router.post('/create_blogs', auth, upload.single('image'), async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file.path;
 


  try {
    const newBlog = new Blog({
      title,
      content,
      category,
      image,
      userId:req.user.userId,
      username:req.user.username
  
    });

    await newBlog.save();
    console.log(newBlog)
    res.json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to get all blogs
router.get('/all_blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get blogs for logged-in user
router.get('/user-blogs', auth, async (req, res) => {
  try {
    console.log("User ID:", req.user.userId);
    const blogs = await Blog.find({ userId: req.user.userId });
    res.json(blogs);
    console.log("Fetched Blogs:", blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// single blog by id
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('userId', 'username');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete Blog Route
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    // Find the blog by ID and ensure it belongs to the user making the request
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// edit blog route

router.put('/edit/:id', auth, upload.single('image'),async (req, res) => {
  const { title, content, category } = req.body;
  
  // Validation check for required fields
  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Title, content, and category are required' });
  }

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    blog.title = title;
    blog.content = content;
    blog.category = category;
    
    if (req.file) {
      blog.image = req.file.path; // Update the image if a new one is uploaded
    }

    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get blogs by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  console.log(category)

  try {
    const blogs = await Blog.find({ category });

    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found for this category' });
    }

    res.json(blogs);
    console.log(blogs)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
