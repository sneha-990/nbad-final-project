import React from 'react';
import Hero from "../components/Hero";
import { Card, CardContent, Typography } from '@mui/material';

function AboutPage() {
  return (
    <>
      <Hero />
      <Card sx={{ margin: '20px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            About Personal Budget App
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to the About Page of our Personal Budget App. This application is designed to help you manage your finances effectively.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
            Key Features:
            <ul>
              <li>Track your monthly budgets</li>
              <li>Monitor your expenses</li>
              <li>Receive alerts to stay on budget</li>
              <li>View detailed charts for insights</li>
              <li>Free to use and secure</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default AboutPage;
