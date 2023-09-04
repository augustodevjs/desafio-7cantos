import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    :focus {
      outline: none;
      box-shadow: none;
    }
  }

  body {
    background-color: #121214;
    color: #E1E1E6;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }

  body, input, textarea, button {
    font: 400 1rem;
  }
`;