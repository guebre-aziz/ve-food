import React from "react";
// MUI
import { Typography, Box } from "@mui/material";

export default function ErrorMessage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        mt: 20,
      }}
    >
      <Typography variant="h6" color="error" align="center">
        Someting went wrong 😥
        <br /> Please, try later or contact the system admin.
      </Typography>
    </Box>
  );
}
