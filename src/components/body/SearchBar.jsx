/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import instance from "../../ConfigAPI/config";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { StyledSearchBar } from "./SearchBar.styled";

export default function SearchBar({ result, searchStartIndex, itemsPerPage }) {
  SearchBar.propTypes = {
    result: PropTypes.func,
    searchStartIndex: PropTypes.number,
    itemsPerPage: PropTypes.number,
  };
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("default");
  const [error, setError] = useState(false);

  function handleSearch() {
    if (text == "") {
      setError(true);
    } else {
      setError(false);
      let searchText = "";
      if (filter == "default") {
        searchText = text;
      } else {
        searchText = text.concat("+", filter);
      }
      instance
        .get(
          "?q=" +
            searchText +
            "&startIndex=" +
            searchStartIndex +
            "&maxResults=" +
            itemsPerPage
        )
        .then(function (response) {
          result(
            [...response.data.items],
            searchText,
            response.data.totalItems
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    if (text != "") {
      handleSearch();
    }
  }, [itemsPerPage, searchStartIndex]);

  return (
    <StyledSearchBar>
      <OutlinedInput
        id="search-box"
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        }
        placeholder="Search for books, magazines and more.."
        sx={{ borderRadius: "12px" }}
        onInput={(e) => setText(e.target.value)}
        value={text}
        error={error}
        onKeyDown={(e) => {
          e.key == "Enter" && handleSearch();
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="search-by-label">Search by</InputLabel>
        <Select
          fullWidth
          labelId="search-by-label"
          label="Search by"
          id="search-by"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ borderRadius: "12px" }}
        >
          <MenuItem value={"default"}>Default</MenuItem>
          <MenuItem value={"intitle"}>Title</MenuItem>
          <MenuItem value={"inauthor"}>Author</MenuItem>
          <MenuItem value={"inpublisher"}>Publisher</MenuItem>
          <MenuItem value={"subject"}>Subject</MenuItem>
          <MenuItem value={"isbn"}>ISBN</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        sx={{ borderRadius: "12px" }}
        color="primary"
        onClick={handleSearch}
      >
        Go
      </Button>
    </StyledSearchBar>
  );
}
