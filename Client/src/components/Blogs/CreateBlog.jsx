import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: null,
    imagePreview: '',
    category: ''
  });

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('category', blogData.category);
    formData.append('image', blogData.image);
    

    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const res = await axios.post('/api/blogs/create_blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        }
      });
      console.log("blog created data", res.data);
      console.log("blog username", res.data.username);
      toast.success('Blog created successfully');
      navigate('/userBlogs'); 
    } catch (error) {
      console.error(error);
      toast.error('Error creating blog');
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response
      });
    
    }
  };


  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Create Blog
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
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 ,backgroundColor:'secondary.main'}}
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
            sx={{ mt: 3, mb: 2,backgroundColor:'secondary.main' }}
           
          >
            Create Blog
          </Button>

        
        </Box>
        
      </Paper>
    </Container>
  );
};

export default CreateBlog;
