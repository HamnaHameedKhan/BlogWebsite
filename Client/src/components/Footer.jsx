import React from 'react';
import { Box, Container, Typography } from '@mui/material';


const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'secondary.main', py: 4, mt: 8 , boxShadow: '6px 4px 0px rgba(0, 0, 0, 0.1)', color: 'white'}}>
      <Container maxWidth="lg">
        
        <Box mt={4}>
          <Typography variant="body2" color="inherit" align="center">
            &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
