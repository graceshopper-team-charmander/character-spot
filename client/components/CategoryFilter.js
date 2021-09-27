import React, { useEffect } from "react";
import {
  deleteFromQueryParam,
  deleteFromQueryParamArr,
  getQueryParam,
  setQueryParam
} from "../utility-funcs/query";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import MenuItem from "@material-ui/core/MenuItem";
import { snakeCase } from "../../utility-funcs/string-manip";
import { fetchProducts } from "../store/products";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  chipRoot: {
    backgroundColor: "#fc7947",
    color: "#484848",
    fontSize: "1.15rem",
    // fontSize: "1rem",
    borderRadius: "5px"
  },
  selectRoot: {
    backgroundColor: "none",
    borderBottom: "none",
    "&:focus": {
      backgroundColor: "red"
    }
  },
  fabRoot: {
    borderRadius: "0",
    height: "46px"
  }
});

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevLocation = prevProps.location;
    const { location } = this.props;
    if (prevLocation.search !== location.search) {
      this.props.fetchProducts(location);
    }
  }

  handleChange(evt) {
    const { location, history } = this.props;
    const query = setQueryParam(location, evt.target.name, evt.target.value.join("|"));
    history.push(location.pathname + "?" + query.toString());
  }

  onDelete(evt) {
    const catName = evt.currentTarget.parentNode.innerText;
    const { location, history } = this.props;
    const newSearch = deleteFromQueryParamArr(location, "categories", catName);
    history.push(location.pathname + "?" + newSearch);
  }

  chipMouseDown(evt) {
    if (
      ["path", "svg"].includes(evt.target.tagName) ||
      Array.from(evt.target.parentNode.classList).includes("MuiChip-deleteIcon")
    ) {
      evt.stopPropagation();
    }
  }

  render() {
    const muiClasses = this.props.classes;
    const { productCategories } = this.props;
    const menuItems = productCategories.map((category) => (
      <MenuItem key={category.id} value={snakeCase(category.name)}>
        {category.name}
      </MenuItem>
    ));

    const urlCategories = getQueryParam(location, "categories");
    const selectedCategories = urlCategories ? urlCategories.split("|") : [];
    return (
      // <div className="multi-select-container">
      <Select
        multiple
        disableUnderline={true}
        className={muiClasses.selectRoot}
        name="categories"
        displayEmpty={true}
        value={selectedCategories}
        onChange={this.handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => {
          return selected.length ? (
            <div className="multi-select-chip-container">
              {selected.map((category) => (
                <Chip
                  onMouseDown={this.chipMouseDown}
                  classes={{ root: muiClasses.chipRoot }}
                  deletable="true"
                  label={category}
                  key={category}
                  onDelete={(data) => this.onDelete(data)}
                />
              ))}
            </div>
          ) : (
            <div className="multi-select-placeholder-text">Categories</div>
          );
        }}>
        {menuItems}
      </Select>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productCategories: state.products.productCategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (location) => dispatch(fetchProducts(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryFilter));
