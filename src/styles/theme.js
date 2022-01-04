import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#efebe9",
    },
    secondary: {
      main: "#ffc215",
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
