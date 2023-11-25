import { StyledBody } from "./Body.styled";
import { StyledCardsContainer } from "./Card.styled";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Card from "./Card";

export default function Body() {
  const [books, setBooks] = useState([]);

  function handleState(newValue) {
    setBooks(newValue);
  }

  return (
    <StyledBody>
      <SearchBar result={handleState} />
      <StyledCardsContainer>
        {books.map((ele, i) => {
          return (
            <Card
              key={i}
              author={ele.volumeInfo.authors}
              title={ele.volumeInfo.title}
              category={ele.volumeInfo.categories}
              image={
                ele.volumeInfo.imageLinks == undefined
                  ? "../../../public/images/no-image.png"
                  : ele.volumeInfo.imageLinks.thumbnail
              }
            />
          );
        })}
      </StyledCardsContainer>
    </StyledBody>
  );
}
