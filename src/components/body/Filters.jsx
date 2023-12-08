/* eslint-disable react/prop-types */
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import useDebounce from "../../Debounce/debounce";
import { StyledFilter } from "./Filters.styled";
import { useState } from "react";

export default function Filters({ filtersData, updateBooks, filtersState }) {
  const [showAllState, setShowAllState] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleFiltersResults = useDebounce(() => {
    updateBooks(selectedFilters);
  }, 700);

  function handleChange(value) {
    setShowAllState(false);
    const index = selectedFilters.indexOf(value);
    if (index == -1) {
      selectedFilters.push(value);
    } else {
      setSelectedFilters(
        selectedFilters.slice(0, index).concat(selectedFilters.slice(index + 1))
      );
    }
    handleFiltersResults(value);
  }

  return (
    <StyledFilter className={filtersState}>
      <FormGroup>
        {Object.getOwnPropertyNames(filtersData) != "" && (
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="Show all Books"
            sx={{ textTransform: "capitalize", fontWeight: "Bold" }}
            onChange={() => {
              updateBooks([]);
              setShowAllState(true);
            }}
            checked={showAllState}
          />
        )}
        {Object.getOwnPropertyNames(filtersData).map((parantEle, i) => {
          return (
            <FormControl key={i}>
              <FormLabel
                id={parantEle}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "Bold",
                  color: "black",
                }}
              >
                {parantEle}
              </FormLabel>
              {Object.getOwnPropertyNames(filtersData[parantEle]).map(
                (ele, i) => {
                  return (
                    ele != "undefined" && (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox />}
                        label={ele}
                        value={ele}
                        sx={{ textTransform: "capitalize", fontWeight: "Bold" }}
                        onChange={(e) => {
                          handleChange(e.target.value);
                        }}
                      />
                    )
                  );
                }
              )}
              <hr />
            </FormControl>
          );
        })}
      </FormGroup>
    </StyledFilter>
  );
}
