import styled from "styled-components";

export const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 80px 1fr;
  column-gap: 12px;
  overflow: hidden;
  h1 {
    text-transform: capitalize;
    span {
      font-size: smaller;
      font-weight: normal;
      color: gray;
    }
  }
  .resultInfoContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: span 1 / span 3;
  }
  &.show {
    grid-template-columns: 1fr;
  }
`;
