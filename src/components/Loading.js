import React from "react";

// MUI
import { Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        m: 20,
      }}
    >
      <Typography variant="h6" sx={{ m: 2 }}>
        Loading...{" "}
      </Typography>
      <CircularProgress color="secondary" />
    </Box>
  );
}
