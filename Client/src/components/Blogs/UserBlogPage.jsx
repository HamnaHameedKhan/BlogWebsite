import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Button, Grid, Box } from '@mui/material';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import '../Blogs/BlogCard.css'

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found.');
          return;
        }

        const res = await axios.get('/api/blogs/user-blogs', {
          headers: {
            'x-auth-token': token,
          },
        });

        setBlogs(res.data);
        console.log('Fetched Blogs:', res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Error fetching blogs.');
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/blogs/delete/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert('Blog deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Error deleting blog');
    }
  };

  const handleReadMore = (id) => {
    navigate(`/blogsDetail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/editBlog/${id}`);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h4" align="center" sx={{ mt: 4, mb: 5, fontWeight: 'bold' }}>
        Your Blogs
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <Grid key={blog._id} item xs={12} sm={4} onClick={() => handleReadMore(blog._id)}>
              <Card style={{ maxWidth: 345, margin: 'auto', marginBottom: 20 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2"  className="truncate">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className="truncate">
                    {blog.content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Author: {blog.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className="truncate">
                   Category: {blog.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Published on: {new Date(blog.date).toDateString()}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      // href={`/edit-blog/${blog._id}`}
                      sx={{ backgroundColor: 'green' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(blog._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog._id);
                      }}
                      sx={{ backgroundColor: 'red' }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">No blogs found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default UserBlogsPage;
