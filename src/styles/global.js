import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --bg: #f2f2f2;
    --text-color: #222;
    --black: #24292e;
  }
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    min-height: 100%;
  }

  body {
    background-color: var(--bg);
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: var(--text-color);
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
