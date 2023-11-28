import { StyledBody } from "./Body.styled";
import { StyledCardsContainer } from "./Card.styled";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Card from "./Card";
import { StyledContent } from "./Content.styled";

export default function Body() {
  const [books, setBooks] = useState([]);

  function handleState(newValue) {
    setBooks(newValue);
  }

  return (
    <StyledBody>
      <SearchBar result={handleState} />
      <StyledContent>
        <StyledCardsContainer>
          {books.map((ele, i) => {
            return <Card key={i} details={ele} />;
          })}
        </StyledCardsContainer>
      </StyledContent>
    </StyledBody>
  );
}
