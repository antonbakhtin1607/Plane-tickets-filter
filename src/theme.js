import { createTheme } from "@mui/material/styles";

const baseTheme = {
  colors: {
    primary: "#6200ea",
    white: "#FFFFFF",
    background: "#F3F7FA",
    blue: "#2196F3",
  },
  font: {
    primaryGrey: "#8C9193",
    lightGrey: "#B4C1C8",
    boldGrey: "#737373",
    blue: "#2196F3",
  },
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: baseTheme.colors.primary,
      white: baseTheme.colors.white,
      background: baseTheme.colors.background,
      blue: baseTheme.colors.blue,
    },
    font: {
      primaryGrey: baseTheme.font.primaryGrey,
      lightGrey: baseTheme.font.lightGrey,
      boldGrey: baseTheme.font.boldGrey,
    },
  },
});

export const styledTheme = baseTheme;
