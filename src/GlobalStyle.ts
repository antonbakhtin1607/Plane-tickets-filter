import { createGlobalStyle } from 'styled-components';

type GlobalStyleProps = {
  colors: string;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Global Styles */
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) => props.theme.colors.background || '#FFFFFF'};
    color: ${(props) => props.colors};
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export default GlobalStyle;
