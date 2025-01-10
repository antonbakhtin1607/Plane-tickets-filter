import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';

import {
  StyledAppContainer,
  StyledLogoBox,
  StyledGridContainer,
  StyledGridItem,
} from './styled/StyledApp';
import { CheckBox } from './components';
import TicketList from './features/tickets/TicketList';

import GlobalStyle from './GlobalStyle';
import { muiTheme, styledTheme } from './theme';
import WebsiteLogo from './assets/WebsiteLogo.png';

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <GlobalStyle colors={styledTheme.font.primaryGrey} />
        <StyledAppContainer>
          <StyledLogoBox component="img" src={WebsiteLogo} alt="Logo" />
          <StyledGridContainer
            container
            spacing={2}
            justifyContent="center"
            alignItems="baseline"
          >
            <StyledGridItem xs={4} backgroundColor={styledTheme.colors.white}>
              <CheckBox />
            </StyledGridItem>
            <StyledGridItem xs={8}>
              <TicketList />
            </StyledGridItem>
          </StyledGridContainer>
        </StyledAppContainer>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default App;
