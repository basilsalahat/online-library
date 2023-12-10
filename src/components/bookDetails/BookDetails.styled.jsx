import styled from "styled-components";

const StyledBookDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20vw 5vw;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 50px;
    h1,
    h2 {
      font-weight: normal;
      max-width: 800px;
    }
    h2 {
      color: gray;
    }
    .photoContainer {
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 150px;
      }
    }
    .publisher {
      color: darkblue;
    }
  }

  .extraInformation {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    h3 {
      font-weight: normal;
      margin: 0;
    }
    div {
      border: solid 1px lightgray;
      padding: 16px;
      border-radius: 8px;
      p {
        color: gray;
      }
      span {
        color: black;
      }
    }
  }
  @media screen and (max-width: 600px) {
    & {
      padding: 0 5vw 5vw;
    }
  }
`;

export default StyledBookDetails;
