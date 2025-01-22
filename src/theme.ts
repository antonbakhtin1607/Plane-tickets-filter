import { createTheme } from '@mui/material/styles';

const baseTheme = {
  colors: {
    primary: '#6200ea',
    white: '#FFFFFF',
    background: '#F3F7FA',
    blue: '#2196F3',
  },
  font: {
    primaryGrey: '#8C9193',
    lightGrey: '#B4C1C8',
    boldGrey: '#737373',
    blue: '#2196F3',
  },
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: baseTheme.colors.primary,
      light: baseTheme.colors.white,
      dark: baseTheme.colors.background,
      contrastText: baseTheme.colors.blue,
    },
  },
});

export const styledTheme = baseTheme;
