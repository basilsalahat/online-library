import { StyledBody } from "./Body.styled";
import { StyledCardsContainer } from "./Card.styled";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";
import instance from "../../ConfigAPI/config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

export default function Body() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterdBooksList, setfilterdBooksList] = useState([]);
  const [resultInfo, setResultInfo] = useState({});
  const [filtersState, setFiltersState] = useState("hide");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchStartIndex, setSearchStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalSearchText, setFinalSearchText] = useState("");

  const searchTest = useSelector((state) => state.searchText.value);

  const { data, isError, error } = useQuery({
    queryKey: ["books", { finalSearchText, searchStartIndex, itemsPerPage }],
    queryFn: async () => {
      const response = await instance.get(
        `?q=${finalSearchText}&startIndex=${searchStartIndex}&maxResults=${itemsPerPage}`
      );
      return response.data;
    },
    enabled: finalSearchText != "",
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setBooks(data.items);
      setResultInfo({
        text: finalSearchText.toString(),
        num: data.totalItems.toString(),
      });
      setFilters({
        authors: Object.groupBy(data.items, ({ volumeInfo }) =>
          volumeInfo.authors
            ? volumeInfo.authors.toString().toLowerCase()
            : "N/A"
        ),
        categories: Object.groupBy(data.items, ({ volumeInfo }) =>
          volumeInfo.categories
            ? volumeInfo.categories.toString().toLowerCase()
            : "N/A"
        ),
        languages: Object.groupBy(data.items, ({ volumeInfo }) =>
          volumeInfo.language
            ? volumeInfo.language.toString().toLowerCase()
            : "N/A"
        ),
      });
    }
  }, [data, finalSearchText]);


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
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <StyledBody>
      <SearchBar />
      {isError && (
        <Snackbar open>
          <MuiAlert severity="error" sx={{ width: "100%" }}>
            {error.message}
          </MuiAlert>
        </Snackbar>
      )}
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
        {books.length > 0 && filterdBooksList.length == 0 && (
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
