/* eslint-disable react/prop-types */
import { StyledSearchBar } from "./SearchBar.styled";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

export default function SearchBar({ result }) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");
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
      axios
        .get("https://www.googleapis.com/books/v1/volumes", {
          params: { q: searchText },
        })
        .then(function (response) {
          result([...response.data.items]);
          console.log(response.data.items);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

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
