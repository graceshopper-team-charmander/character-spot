import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers, fetchAdminProducts } from "../store/admin";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import AllUsers from "./AllUsers";
import AllAdminProducts from "./AllAdminProducts";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1em 0"
  },
  adminPage: {
    width: "80%",
    margin: "0 auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  adminTable: {
    width: "100%",
    margin: "0 0 2em 0"
  },
  subHeader: {
    padding: "1em 0 1.2em 0",
    fontSize: "1.2em"
  },
  tableTitle: {
    backgroundColor: "#484848",
    color: "white",
    padding: ".5em 1em",
    height: "50px",
    fontSize: "1.2em"
  },
  adminLinks: {
    color: "#484848",
    "&:hover": {
      color: "#e71e07",
      textDecoration: "none",
      transition: "all .4s ease"
    }
  }
}));

const Admin = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const products = useSelector((state) => state.admin.products);

  console.log(users, products);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAdminUsers());
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="row" justifyContent="flex-start" className="admin-header">
        <Grid container direction="row" justifyContent="flex-start" className="admin-title">
          Administration
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.adminPage}>
        <Grid container direction="column" justifyContent="flex-start">
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            className={classes.subHeader}>
            <a href="#users" className={classes.adminLinks}>
              Users
            </a>
            <a href="#products" className={classes.adminLinks}>
              Products
            </a>
            <a href="#" className={classes.adminLinks}>
              Promos
            </a>
          </Grid>
        </Grid>
        <Paper elevation={3} className={classes.adminTable}>
          <Grid container direction="column" justifyContent="center">
            <Grid id="users" className={classes.tableTitle} container alignItems="center">
              Users
            </Grid>
            <AllUsers users={users} />
          </Grid>
        </Paper>
        <Paper elevation={3} className={classes.adminTable}>
          <Grid container direction="column" justifyContent="center">
            <Grid id="products" className={classes.tableTitle} container alignItems="center">
              Products
            </Grid>
            <AllAdminProducts products={products} />
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default Admin;

// Get all products
// Get all users
// If products have 0 - delete from database
// Promo codes? - probably not
