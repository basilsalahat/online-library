import styled from "styled-components";

export const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: max-content;
  gap: 22px;
  justify-items: start;
`;

export const StyledCard = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    aspect-ratio: 3 / 4;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px 16px;
    & p {
      text-transform: capitalize;
    }
    & p:first-child {
      background-color: rgba(255, 99, 71, 0.2);
      padding: 4px 8px;
      border-radius: 6px;
    }
    & p:nth-child(2) {
      color: gray;
      margin: 0;
    }
    & p:nth-child(4) {
      text-overflow: ellipsis;
      padding-top: 12px;
    }
  }
  transition: 250ms transform ease-in-out, box-shadow 250ms;
  &:hover {
    transform: scale(1.025);
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  }
`;
