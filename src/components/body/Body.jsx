import { StyledBody } from "./Body.styled";
import { StyledCardsContainer } from "./Card.styled";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Card from "./Card";
import { StyledContent } from "./Content.styled";
import Filters from "./Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";

export default function Body() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterdBooksList, setfilterdBooksList] = useState([]);
  const [resultInfo, setResultInfo] = useState({});
  const [filtersState, setFiltersState] = useState("hide");

  function handleState(newBooks, searchText, totalItemNum) {
    setBooks(newBooks);
    setResultInfo({
      text: searchText.toString(),
      num: totalItemNum.toString(),
    });
    setFilters({
      authors: Object.groupBy(newBooks, ({ volumeInfo }) =>
        volumeInfo.authors ? volumeInfo.authors.toString().toLowerCase() : "N/A"
      ),
      categories: Object.groupBy(newBooks, ({ volumeInfo }) =>
        volumeInfo.categories
          ? volumeInfo.categories.toString().toLowerCase()
          : "N/A"
      ),
      languages: Object.groupBy(newBooks, ({ volumeInfo }) =>
        volumeInfo.language
          ? volumeInfo.language.toString().toLowerCase()
          : "N/A"
      ),
    });
  }
  function filteredBooks(filtersSelected) {
    let result = [];
    filtersSelected.forEach((filter) => {
      for (const [filterCategory, value] of Object.entries(filters)) {
        for (const [key] of Object.entries(value)) {
          if (key == filter) {
            result.push(filters[filterCategory][key]);
          }
        }
      }
    });
    setfilterdBooksList(result);
  }

  return (
    <StyledBody>
      <SearchBar result={handleState} />
      <StyledContent className={filtersState}>
        {resultInfo["text"] && (
          <div className="resultInfoContainer">
            <h1>
              {resultInfo["text"].toString().split("+")[0]}
              <span>&nbsp;[{resultInfo["num"]}]</span>
            </h1>
            <Button
              variant="text"
              endIcon={<FilterAltIcon />}
              sx={{ color: "gray", textTransform: "capitalize" }}
              size="large"
              onClick={() => {
                filtersState == "show"
                  ? setFiltersState("hide")
                  : setFiltersState("show");
              }}
            >
              {filtersState} Filter
            </Button>
          </div>
        )}
        <Filters
          filtersData={filters}
          updateBooks={filteredBooks}
          filtersState={filtersState}
        />
        <StyledCardsContainer>
          {filterdBooksList.length > 0
            ? filterdBooksList.map((ele, i) => {
                return <Card key={i} details={ele[0]} />;
              })
            : books.map((ele, i) => {
                return <Card key={i} details={ele} />;
              })}
        </StyledCardsContainer>
      </StyledContent>
    </StyledBody>
  );
}
