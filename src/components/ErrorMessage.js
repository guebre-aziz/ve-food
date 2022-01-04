import React from "react";

import { Typography, Box } from "@mui/material";

export default function ErrorMessage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 15,
      }}
    >
      <Typography variant="h6" color="error">
        Someting went wrong. Please, try later or contact the system admin.{" "}
      </Typography>
    </Box>
  );
}
