import React, { useRef, useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

const Blogs = ({ blogs, selectedCategory }) => {
  const navigate = useNavigate();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const blogRef = useRef(null);

  const handleReadMore = (id) => {
    navigate(`/blogsDetail/${id}`);
  };

  // Filter blogs based on selected category
  useEffect(() => {
    const filtered = selectedCategory === 'All'
      ? blogs
      : blogs.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());

    setFilteredBlogs(filtered);
  }, [selectedCategory, blogs]);

  // Scroll into view when URL hash changes or selectedCategory changes
  useEffect(() => {
    // Function to handle scroll
    const scrollToBlogSection = () => {
      if (window.location.hash === '#blogs' && blogRef.current) {
        blogRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Scroll on component mount or when selectedCategory changes
    scrollToBlogSection();

    // Add event listener for hash changes
    window.addEventListener('hashchange', scrollToBlogSection);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', scrollToBlogSection);
    };
  }, [selectedCategory]); // Added selectedCategory as a dependency

  return (
    <>
      <div ref={blogRef} id="blogs">
        <Typography variant='h3' component='h3' gutterBottom align='center'>Read Our Latest Blogs</Typography>
        <Grid container spacing={4}>
          {filteredBlogs.map(blog => (
            <Grid key={blog._id} item xs={12} sm={4}>
              <Card style={{ maxWidth: 345, margin: 'auto', marginBottom: 20 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className="truncate">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className="truncate">
                    {blog.content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Author: {blog.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Category: {blog.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Published on: {new Date(blog.date).toDateString()}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleReadMore(blog._id)}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Blogs;
