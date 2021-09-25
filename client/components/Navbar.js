/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cart";

import NavbarMenu from "./NavbarMenu";

import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "1%",
    paddingRight: "1%",
    boxShadow: "none",
    borderBottom: "2px solid gray"
  },
  toolBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  link: {
    color: "#484848",
    margin: "2%",
    marginRight: "3%",
    "&:hover": {
      color: "#e71e07",
      textDecoration: "none",
      transition: "all .4s ease"
    },
    display: "flex",
    flexFlow: "row nowrap",
    whiteSpace: "nowrap"
  },
  links: {
    width: "75%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2
  },
  linkLeft: {
    display: "flex",
    width: "30%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  logo: {
    zIndex: 3,
    marginRight: "3%"
  },
  linkRight: {
    display: "flex",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  badge: {
    marginRight: "4%",
    marginBottom: "15px"
  },
  total: {},
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#484848",
    opacity: ".8",
    "&:hover": {
      backgroundColor: "#484848",
      opacity: ".7"
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    },
    zIndex: 4
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const Navbar = ({ handleClick, isLoggedIn, cart }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  let total = 0;
  if (!cart.length) {
    total = 0;
  } else {
    let quantity = cart.map((item) => {
      return item.cart.quantity;
    });
    total = quantity.reduce((accum, current) => accum + current);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className={styles.navbar}
        style={{ backgroundColor: "white !important" }}>
        <ToolBar className={styles.toolBar}>
          <RouterLink to="/" className={styles.logo}>
            <img
              src="https://fontmeme.com/permalink/210922/7883c797940c9330ef88b87589f6212a.png"
              className="logo-image"
            />
          </RouterLink>
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={styles.links}>
            <div className={styles.linkLeft}>
              {/* <Link component={RouterLink} to="/" className={styles.link}>
                <i className="fas fa-home icon"></i>
                <div className="nav-link-text">Home</div>
              </Link> */}
              <Link component={RouterLink} to="/products" className={styles.link}>
                <i className="fas fa-gamepad"></i>
                <div className="nav-link-text">Products</div>
              </Link>
            </div>
            {isLoggedIn ? (
              <div className={styles.linkRight}>
                <Link component={RouterLink} to="/cart" className={styles.link}>
                  <Badge
                    badgeContent={total}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                    className={styles.badge}></Badge>
                  <i className="fas fa-shopping-cart"></i>
                  <div className="nav-link-text">Cart</div>
                </Link>
                <NavbarMenu />
              </div>
            ) : (
              <div className={styles.linkRight}>
                <Link component={RouterLink} to="/login" className={styles.link}>
                  <i className="fas fa-sign-in-alt"></i>
                  <div className="nav-link-text">Login</div>
                </Link>

                <Link component={RouterLink} to="/signup" className={styles.link}>
                  <i className="fas fa-user-plus"></i>
                  <div className="nav-link-text">Sign Up</div>
                </Link>
              </div>
            )}
          </div>
        </ToolBar>
      </AppBar>
      <div className="poke-walk-box">
        <img className="poke-walk" src="/images/pokemon-walk.png" alt="pokemon-walk" />
      </div>
    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    cart: state.cart.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
