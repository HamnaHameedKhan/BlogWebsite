import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import logo from '../assets/logo.PNG'; // Replace with your logo path
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ isAuthenticated, onLogout }) => {

  const navigate=useNavigate()

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', color: 'secondary.main' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Subscribe text on the left */}
          <Typography variant="h6" component="div">
            Subscribe
          </Typography>
          

          {/* Logo in the center */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: 100 }} onClick={(()=>navigate('/'))} /> {/* Adjust height as needed */}
          </Box>

          {/* Sign Up button on the right */}
          {isAuthenticated ? (
            <>
            <Button variant="contained" component={Link} to="/createBlog" sx={{
                backgroundColor: 'secondary.main', color: '#fff', '&:hover': {
                  backgroundColor: '#AA96DA', // Slightly visible background on hover
                }, 
              }}><AddIcon/> Create Blog  </Button>
             
              <Button color="inherit" onClick={onLogout} component={Link} to="/login"  variant="contained" sx={{
                backgroundColor: 'secondary.main', color: '#fff', '&:hover': {
                  backgroundColor: '#AA96DA', // Slightly visible background on hover
                },  marginLeft:2,
              }}>
                Logout
              </Button>
              <Button color="inherit"  component={Link} to="/userblogs"  variant="contained" sx={{
                backgroundColor: 'secondary.main', color: '#fff', '&:hover': {
                  backgroundColor: '#AA96DA', // Slightly visible background on hover
                },  marginLeft:2,
              }}>
                My blogs
              </Button>

            </>


          ) : (
            <>
            <Button color="inherit" component={Link} to="/signup" variant="contained" sx={{
              backgroundColor: 'secondary.main', color: '#fff', '&:hover': {
                backgroundColor: '#AA96DA', // Slightly visible background on hover
              },
            }}>
              Signup
            </Button>

            <Button color="inherit" component={Link} to="/login" variant="contained" sx={{
              backgroundColor: 'secondary.main', color: '#fff', '&:hover': {
                backgroundColor: '#AA96DA',  // Slightly visible background on hover
              },marginLeft:2,
            }}>
              Login
            </Button>
            </>
           
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
