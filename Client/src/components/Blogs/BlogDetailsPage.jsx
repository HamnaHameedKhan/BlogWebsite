import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { Container, Typography, Box } from '@mui/material';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {new Date(blog.date).toDateString()} | By {blog.username}
        </Typography>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '20px' }} />
        <Typography variant="body1" paragraph>
          {blog.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default BlogDetailPage;
