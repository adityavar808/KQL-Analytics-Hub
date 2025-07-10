import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d3e50",
    },
    secondary: {
      main: "#667eea",
    },
    accent2: {
      main: "#764ba2",
    },
    background: {
      default: "#f4f6fb",
      paper: "#fff",
    },
    success: {
      main: "#d4edda",
    },
    error: {
      main: "#f8d7da",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
});

export default theme;
