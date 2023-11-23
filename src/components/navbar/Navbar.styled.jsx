import styled from "styled-components";

export const StyledNavbar = styled.nav`
  height: 80px;
  padding: 0 10vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  img {
    width: 24px;
    height: auto;
    cursor: pointer;
  }

  ul {
    list-style: none;
    font-weight: bold;
    padding: 0;
    a {
      color: black;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    a:hover {
      color: #2a6ff5;
    }
  }
`;
