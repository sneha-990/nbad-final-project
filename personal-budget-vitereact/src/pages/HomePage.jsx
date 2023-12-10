import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import Hero from "../components/Hero";

function HomePage() {
  return (
    <>
      <Hero />
      <Container component="main" sx={{ flexGrow: 1, textAlign: "center", height: "50vh" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">Stay on track</Typography>
              <Typography variant="body1">
                Do you know where you are spending your money? If you really
                stop to track it down, you would get surprised!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">Alerts</Typography>
              <Typography variant="body1">
                What if your clothing budget ended? You will get an alert. The
                goal is to never go over the budget.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">Results</Typography>
              <Typography variant="body1">
                People who stick to a financial plan, budgeting every expense,
                get out of debt faster! Also, they to live happier lives...
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">Free</Typography>
              <Typography variant="body1">
                This app is free!!! And you are the only one holding your data!
                manager all you personal finances in one place.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;
