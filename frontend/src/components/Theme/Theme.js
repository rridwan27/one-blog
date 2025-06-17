import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#111827",
      secondary: "#374151",
    },
    background: {
      default: "#ffffff",
      paper: "#f9fafb",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#f3f4f6",
      secondary: "#e5e7eb",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
  },
});
