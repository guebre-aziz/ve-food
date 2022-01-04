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
        <Container maxWidth="lg"></Container>
      </Box>
    </footer>
  );
}

export default Footer;
