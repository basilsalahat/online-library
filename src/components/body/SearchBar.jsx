/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { setSearchText } from "../../state/searchTextSlice";
export default function SearchBar() {
  SearchBar.propTypes = {
    setFinalSearchText: PropTypes.func,
  };
  const st = useSelector((state) => state.searchText.value);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("default");
  const [error, setError] = useState(false);

  function handleSearch() {
    if (st == "") {
      setError(true);
    } else {
      setError(false);
      let searchText = "";
      if (filter == "default") {
        searchText = st;
      } else {
        searchText = st.concat("+", filter);
      }
      dispatch(setSearchText(searchText));
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
        onInput={(e) => dispatch(setSearchText(e.target.value))}
        value={st}
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
