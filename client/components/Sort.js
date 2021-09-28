import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const Sort = (props) => {
  const muiClasses = useStyles();
  const location = useLocation();
  const history = useHistory();
  const sortOptions = { name: "Name", price: "Price" };

  const sortDirectionsKey = {
    name: { asc: "Ascending", desc: "Descending" },
    price: { asc: "Low to High", desc: "High to Low" }
  };

  const sortKey = getQueryParam(location, "sort");
  const sortDirections = sortKey ? sortDirectionsKey[sortKey] : {};

  const handleChange = (location, history, evt) => {
    const query = setQueryParam(location, evt.target.name, evt.target.value);
    history.push(location.pathname + "?" + query.toString());
  };

  return (
    <>
      <FormControl className={muiClasses.formControl}>
        <InputLabel id="sort-select">Filter</InputLabel>
        <Select
          labelId="sort-select"
          id="sort-select"
          value={getQueryParam(location, "sort") || "name"}
          name="sort"
          onChange={(evt) => handleChange(location, history, evt)}>
          {Object.entries(sortOptions).map(([key, val]) => (
            <MenuItem key={key} value={key}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={muiClasses.formControl}>
        <InputLabel id="sort-direction-select">Sort Direction</InputLabel>
        <Select
          labelId="sort-direction-select"
          id="sort-direction-select"
          value={getQueryParam(location, "dir") || "asc"}
          name="dir"
          onChange={(evt) => handleChange(location, history, evt)}>
          {Object.entries(sortDirections).map(([key, val]) => (
            <MenuItem key={key} value={key}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Sort;
