/* eslint-disable react/prop-types */
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { StyledFilter } from "./Filters.styled";

export default function Filters({ filtersData, updateBooks, filtersState }) {
  function searchItem(value, category) {
    Object.entries(filtersData[category]).forEach((e) => {
      if (e[0] == value) {
        updateBooks(e[1]);
      }
    });
  }
  return (
    <StyledFilter className={filtersState}>
      {Object.getOwnPropertyNames(filtersData).map((ele, i) => {
        return (
          <FormControl key={i}>
            <FormLabel
              id={ele}
              sx={{
                textTransform: "capitalize",
                fontWeight: "Bold",
                color: "black",
              }}
            >
              {ele}
            </FormLabel>
            <RadioGroup
              aria-labelledby={ele}
              name={ele}
              onChange={(e) => {
                searchItem(e.target.value, ele);
              }}
            >
              {Object.getOwnPropertyNames(filtersData[ele]).map((ele, i) => {
                return (
                  ele != "undefined" && (
                    <FormControlLabel
                      key={i}
                      value={ele}
                      control={<Radio />}
                      label={ele}
                      sx={{ textTransform: "capitalize", fontWeight: "Bold" }}
                    />
                  )
                );
              })}
            </RadioGroup>
            <hr />
          </FormControl>
        );
      })}
      {Object.getOwnPropertyNames(filtersData) != "" && (
        <Button
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            marginTop: "10px",
          }}
          color="error"
          onClick={() => {
            updateBooks([]);
          }}
        >
          Clear Filters
        </Button>
      )}
    </StyledFilter>
  );
}
