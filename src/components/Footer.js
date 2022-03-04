import React from "react";
// MUI
import { Box, Container, IconButton, Typography, Divider } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <footer>
      <Box bgcolor="text.secondary" color="white">
        <Container
          sx={{
            maxWidth: "xl",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography variant="body2" color="primary" sx={{ pr: 2 }}>
            guebre aziz
          </Typography>
          <Divider orientation="vertical" flexItem />

          <IconButton
            href="https://www.linkedin.com/in/aziz-guebre-a49a8b177/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>

          <IconButton href="https://github.com/guebre-aziz" target="_blank">
            <GitHubIcon />
          </IconButton>

          <IconButton
            href="https://www.instagram.com/guebreaziz_/"
            target="_blank"
          >
            <InstagramIcon />
          </IconButton>
        </Container>
      </Box>
    </footer>
  );
}
