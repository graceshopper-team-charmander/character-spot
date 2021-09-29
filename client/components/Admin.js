import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers, fetchAdminProducts } from "../store/admin";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import AllUsers from "./AllUsers";
import AllAdminProducts from "./AllAdminProducts";
import LoadingBar from "./LoadingBar";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AdminTabSelector from "./AdminTabSelector";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import AdminUserList from "./AdminUserList";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AdminUserFormDialog from "./AdminUserFormDialog";
import AdminProductList from "./AdminProductList";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import { fetchProducts } from "../store/products";

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
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center"
  },
  listContainer: {
    flexGrow: 1,
    marginTop: "1rem"
  },
  snackbarRoot: {
    backgroundColor: "#009edb"
  },
  alertRoot: {
    backgroundColor: "#009edb"
  },
  alertIcon: {
    color: "#fcd000 !important"
  }
}));

const Admin = () => {
  const classes = useStyles();
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedTab, setSelectedTab] = useState("users");
  const history = useHistory();

  useEffect(() => {
    history.push('/admin/' + selectedTab);
  },[]);

  return (
    <>
      <Grid item xs={12} className="page">
        <div className="page-header">
          <div className="page-title">Administration</div>
        </div>
        <div className="page-body">
          <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.tabsContainer}>
              <AdminTabSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </Grid>
            <Grid item className={classes.listContainer}>
              <Route path="/admin/users">
                <AdminUserList
                  setSnackbarStatus={setSnackbarStatus}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              </Route>
              <Route path="/admin/products">
                <AdminProductList
                  setSnackbarStatus={setSnackbarStatus}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              </Route>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Snackbar
        className={classes.snackbarRoot}
        open={snackbarStatus}
        autoHideDuration={3000}
        onClose={() => setSnackbarStatus(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          classes={{
            root: classes.alertRoot,
            icon: classes.alertIcon
          }}
          onClose={() => setSnackbarStatus(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}>
          <div className="snackbar-message">{snackBarMessage}</div>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Admin;
