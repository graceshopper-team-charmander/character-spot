import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./Orders";
import { connect } from "react-redux";
import { logout } from "../store";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "no-wrap"
  },
  paper: {
    marginRight: theme.spacing(2)
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
    textTransform: "none",
    display: "flex",
    flexFlow: "row nowrap",
    whiteSpace: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer"
  }
}));

export function NavbarMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.auth.firstName);
  console.log(name);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      {/* <div> */}
      <Link
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.link}>
        <i className="fas fa-user-circle"></i>
        <div className="nav-link-text">{name}</div>
      </Link>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose} className={classes.link}>
                    <i className="fas fa-user"></i>
                    <div className="nav-link-text">Profile</div>
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/orders"
                    onClick={handleClose}
                    className={classes.link}>
                    <i className="fas fa-history"></i>
                    <div className="nav-link-text">Order History</div>
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/"
                    onClick={() => dispatch(logout())}
                    className={classes.link}>
                    <i className="fas fa-sign-out-alt"></i>
                    <div className="nav-link-text">Logout</div>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* </div> */}
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(null, mapDispatch)(NavbarMenu);
