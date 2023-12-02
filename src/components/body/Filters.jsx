/* eslint-disable react/prop-types */
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { StyledFilter } from "./Filters.styled";
import { useState } from "react";

export default function Filters({ filtersData, updateBooks, filtersState }) {
  const [showAllState, setShowAllState] = useState(true);
  function searchItem(value, category) {
    Object.entries(filtersData[category]).forEach((e) => {
      if (e[0] == value) {
        updateBooks(e[1]);
      }
    });
  }
  return (
    <StyledFilter className={filtersState}>
      <RadioGroup aria-labelledby="filters" name="filters">
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
                        value={ele}
                        control={<Radio />}
                        label={ele}
                        sx={{ textTransform: "capitalize", fontWeight: "Bold" }}
                        onChange={(e) => {
                          searchItem(e.target.value, parantEle);
                          setShowAllState(false);
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
      </RadioGroup>
    </StyledFilter>
  );
}
