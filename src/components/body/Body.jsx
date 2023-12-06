import { StyledBody } from "./Body.styled";
import { StyledCardsContainer } from "./Card.styled";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Card from "./Card";
import { StyledContent } from "./Content.styled";
import Filters from "./Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";

export default function Body() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterdBooksList, setfilterdBooksList] = useState([]);
  const [resultInfo, setResultInfo] = useState({});
  const [filtersState, setFiltersState] = useState("hide");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchStartIndex, setSearchStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

  function handlePaginationChange(event, value) {
    setCurrentPage(value);
    setSearchStartIndex(itemsPerPage * value);
  }

  return (
    <StyledBody>
      <SearchBar
        result={handleState}
        searchStartIndex={searchStartIndex}
        itemsPerPage={itemsPerPage}
      />
      <StyledContent className={filtersState}>
        {resultInfo["text"] && (
          <div className="resultInfoContainer">
            <h1>
              {resultInfo["text"].toString().split("+")[0]}
              <span>&nbsp;[{resultInfo["num"]}]</span>
            </h1>
            <div>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="items-per-page-label">
                  Items per page
                </InputLabel>
                <Select
                  labelId="items-per-page-label"
                  id="items-per-page"
                  value={itemsPerPage}
                  label="Items per page"
                  onChange={(e) => {
                    setItemsPerPage(e.target.value);
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                </Select>
              </FormControl>
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
        {(books.length > 0 || filterdBooksList.length > 0) && (
          <Pagination
            count={Math.floor(resultInfo["num"] / itemsPerPage)}
            shape="rounded"
            color="primary"
            className="pagination"
            size="large"
            page={currentPage}
            onChange={handlePaginationChange}
          />
        )}
      </StyledContent>
    </StyledBody>
  );
}
