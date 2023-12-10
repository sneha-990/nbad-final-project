import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Footer() {
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Box bgcolor="primary.main" color="white" p={2} textAlign="center">
        <Container>
          <Typography variant="body2">
            All rights reserved &copy; Sneha Gourishetty {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
