/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../store";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "1%",
    paddingRight: "1%"
  },
  toolBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  link: {
    color: "#484848",
    margin: "2%",
    "&:hover": {
      color: "#e71e07",
      textDecoration: "none",
      transition: "all .4s ease"
    },
    width: "25%"
  },
  links: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkLeft: {
    display: "flex",
    width: "50%",
    justifyContent: "flex-start"
  },
  logo: {
    width: "35%",
    marginRight: "3%"
  },
  linkRight: {
    display: "flex",
    width: "50%",
    justifyContent: "flex-end"
  }
  // search: {
  //   width: "50%",
  //   display: "flex",
  //   alignItems: "center",
  //   flexShrink: 1
  // },
  // searchButton: {
  //   backgroundColor: "#e71e07",
  //   height: "40px",
  //   width: "40px",
  //   alignSelf: "flex-end",
  //   boxShadow: "none",
  //   padding: 0,
  //   borderTopLeftRadius: 0,
  //   borderBottomLeftRadius: 0
  // }
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const styles = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.navbar}>
        <ToolBar className={styles.toolBar}>
          <img
            className={styles.logo}
            src="https://fontmeme.com/permalink/210922/7883c797940c9330ef88b87589f6212a.png"
          />
          {/* <div className={styles.search}>
            <TextField id="standard-basic" label="Search" variant="standard" />
            <Button variant="contained" className={styles.searchButton}>
              <i className="fas fa-search"></i>
            </Button>
          </div> */}
          <div className={styles.links}>
            <div className={styles.linkLeft}>
              <Link component={RouterLink} to="/home" className={styles.link}>
                <i className="fas fa-home icon"></i>
                Home
              </Link>
              <Link component={RouterLink} to="/products" className={styles.link}>
                <i className="fas fa-gamepad"></i>
                Products
              </Link>
            </div>
            {isLoggedIn ? (
              <div className={styles.linkRight}>
                <Link component={RouterLink} to="/cart" className={styles.link}>
                  <i className="fas fa-shopping-cart"></i>
                  Cart
                </Link>
                <Link
                  component={RouterLink}
                  to="/home"
                  onClick={handleClick}
                  className={styles.link}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </Link>
              </div>
            ) : (
              <div className={styles.linkRight}>
                <Link component={RouterLink} to="/login" className={styles.link}>
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </Link>

                <Link component={RouterLink} to="/signup" className={styles.link}>
                  <i className="fas fa-user-plus"></i>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </ToolBar>
      </AppBar>
    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn
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
