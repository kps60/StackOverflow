import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use this if you're using react-router for navigation

const NotFound = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoHome = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          style={{ marginTop: '20px' }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
