import React from "react";
import { Grid, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link to="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link to="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link to="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link to="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link to="/" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Box>
                <Link to="/" color="inherit">
                  Backup
                </Link>
              </Box>
              <Box>
                <Link to="/" color="inherit">
                  History
                </Link>
              </Box>
              <Box>
                <Link to="/" color="inherit">
                  Roll
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Material UI Workshop &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
