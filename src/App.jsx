import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
} from "@mui/material";
import logo from "./assets/logo.png";

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
    boldGrey: "#818181",
  },
};

const muiTheme = createTheme({
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

const styledTheme = {
  ...baseTheme,
};

const CustomCheckbox = ({ checked, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked={checked}
          sx={{
            color: styledTheme.colors.primary,
            "& .MuiSvgIcon-root": {
              color: styledTheme.colors.blue, // Checkmark color
            },
            "&.Mui-checked": {
              color: styledTheme.colors.blue, // Checkbox color when checked
            },
          }}
        />
      }
      label={label}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <GlobalStyle colors={styledTheme.font.primaryGrey} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: styledTheme.colors.background,
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: "150px",
              height: "auto",
              marginBottom: 2,
            }}
          />
          <Grid2
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            backgroundColor={styledTheme.colors.white}
            style={{
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid2 xs={4}>
              <div
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: styledTheme.font.primaryGrey,
                  fontWeight: "700",
                }}
              >
                Кількість пересадок
              </div>
              <FormGroup>
                <FormGroup>
                  <CustomCheckbox checked={true} label="Все" />
                  <CustomCheckbox checked={false} label="Без пересадок" />
                  <CustomCheckbox checked={false} label="1 пересадка" />
                  <CustomCheckbox checked={false} label="2 пересадки" />
                  <CustomCheckbox checked={false} label="3 пересадки" />
                </FormGroup>
              </FormGroup>
            </Grid2>
            <Grid2 xs={8}>
              <div style={{ textAlign: "center" }}>size=8</div>
            </Grid2>
          </Grid2>
        </div>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default App;
