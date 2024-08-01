import React from 'react';
import { Box, Container, Button } from '@mui/material';

const Categories = ({ categories, onCategoryClick }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="contained"
              color="secondary"
              sx={{ textTransform: 'none' }}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Categories;
