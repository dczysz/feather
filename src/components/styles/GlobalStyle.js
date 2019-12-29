import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --accentHsl: ${p => p.accentHsl};
  }

  ::selection {
    background-color: hsl(var(--accentHsl));
    color: ${p => p.theme.white};
  }

  body {
    background-color: hsl(var(--accentHsl));
  }
`;
