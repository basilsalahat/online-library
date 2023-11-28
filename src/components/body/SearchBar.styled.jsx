import styled from "styled-components";

export const StyledSearchBar = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr auto;
  column-gap: 12px;
  padding: 24px 0;

  @media only screen and (max-width: 600px) {
    & {
      grid-template-columns: repeat(4, 1fr);
      gap: 12px 6px;
      & div:first-child {
        grid-area: span 1 / span 4;
      }
      & div:nth-child(2) {
        grid-area: span 1 / span 3;
      }
    }
  }
`;
