import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios';

const EditBlogPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: null,
    imagePreview: '',
    category: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        const blog = res.data;
        setBlogData({
          title: blog.title,
          content: blog.content,
          image: null,
          imagePreview: blog.image,
          category: blog.category
        });
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Error fetching blog.');
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData({ ...blogData, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('category', blogData.category);
    if (blogData.image) {
      formData.append('image', blogData.image);
    }

    console.log('Form Data:', {
      title: blogData.title,
      content: blogData.content,
      category: blogData.category,
      image: blogData.image
    });
    try {
      const token = localStorage.getItem('token');
      const res= await axios.put(`/api/blogs/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      console.log("blog created data", res.data);
      alert('Blog updated successfully');
      navigate('/userBlogs');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
      console.error('Error details:', error.response ? error.response.data : 'No response data');

    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Edit Blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Blog Title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            value={blogData.content}
            onChange={handleChange}
            multiline
            rows={6}
          />
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={blogData.category}
              onChange={handleChange}
              label="Category"
            >
             <MenuItem value="food">Food</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2, backgroundColor: 'secondary.main' }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {blogData.imagePreview && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <img
                src={blogData.imagePreview}
                alt="Blog Preview"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, backgroundColor: 'secondary.main' }}
          >
            Update Blog
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBlogPage;
