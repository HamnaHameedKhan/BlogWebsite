import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import heroImage from '../assets/hero.jpg'; // Replace with your image path
import { useNavigate } from 'react-router-dom';


const Hero = ({ isAuthenticated }) => {

  const navigate = useNavigate();

  const handleCreateBlogClick = () => {
    if (isAuthenticated) {
      navigate('/createBlog');
    } else {
      navigate('/login');
    }
  };
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add overlay for better text visibility
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ maxWidth: '50%' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Our Blog Website
            </Typography>
            <Typography variant="h5" paragraph>
              Discover amazing content, stories, and ideas shared by our community.
            </Typography>



            <Typography variant="h5" paragraph>
              To Become a part of our vibrant community. Start blogging today!
            </Typography>

            <Button variant="contained" color="primary" onClick={handleCreateBlogClick}>
                  Create Blog
                </Button>

          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
