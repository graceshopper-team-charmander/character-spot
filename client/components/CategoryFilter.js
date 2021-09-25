import React, { useEffect } from "react";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
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
import FilterListIcon from "@material-ui/icons/FilterList";

const styles = (theme) => ({
  chipRoot: {
    backgroundColor: "#fcd000",
    color: "#e71e07",
    fontWeight: "bold",
    fontSize:"1.25rem",
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
    const query = setQueryParam(location, evt.target.name, evt.target.value.join(","));
    history.push(location.pathname + "?" + query.toString());
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
    const selectedCategories = urlCategories ? urlCategories.split(",") : [];
    return (
      <div className="multi-select-container">
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
            return (
              selected.length ?
              (<div className="multi-select-chip-container">
                {selected.map((category) => (
                  <Chip
                    key={category.id}
                    classes={{ root: muiClasses.chipRoot }}
                    label={category}
                    key={category}
                  />
                ))}
              </div>)
                : <div className="multi-select-placeholder-text">Categories</div>
            )

          }}>
          {menuItems}
        </Select>
      </div>
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
