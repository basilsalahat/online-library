import styled from "styled-components";

export const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &.show {
    display: none;
  }
  hr {
    background-color: #d3d3d36c;
    border: 0;
    width: 90%;
    height:1px;
  }
`;
