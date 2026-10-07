import { createGlobalStyle } from "styled-components";

export const theme = {
  brand: "#2347bd",
  brandSoft: "#e8ebf8",
  ink: "#0f1e47",
  muted: "#5b5b60",
  line: "#e7e5df",
  paper: "#f3f2ee",
  red: "#b91c1c",
  green: "#15803d",
  sans: '"IBM Plex Sans", system-ui, sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: ${theme.sans};
    color: ${theme.ink};
    line-height: 1.5;
  }
  h1, h2, h3, h4, p, ul { margin: 0; }
  a { color: inherit; text-decoration: none; }
  button, input, select { font: inherit; }
`;
