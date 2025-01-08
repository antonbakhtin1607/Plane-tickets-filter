import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { Box,  Grid2 } from "@mui/material";

import WebsiteLogo from "./assets/WebsiteLogo.png";
import CheckBox from "./components/CheckBox/CheckBox";
import TicketList from "./components/TicketList/TicketList";
import { muiTheme, styledTheme } from "./theme"; 

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <GlobalStyle colors={styledTheme.font.primaryGrey} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Box
            component="img"
            src={WebsiteLogo}
            alt="Logo"
            sx={{
              height: "80px",
              marginBottom: 3,
              marginTop: 3,
            }}
          />
          <Grid2 container spacing={2} justifyContent="center" alignItems="baseline">
            <Grid2
              xs={4}
              
              sx={{
                backgroundColor: styledTheme.colors.white,
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CheckBox />
            </Grid2>
            <Grid2
              xs={8}
              sx={{
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <TicketList />
            </Grid2>
          </Grid2>
        </div>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default App;
