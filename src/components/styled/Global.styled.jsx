import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

    * {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        user-select: none;
    }
    body {
        margin: 0;
        padding: 0;
        background-color:#fffcfc;
    }
`;
