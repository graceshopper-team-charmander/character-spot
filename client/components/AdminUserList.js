import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts, fetchAdminUsers } from "../store/admin";
import AdminUserFormDialog from "./AdminUserFormDialog";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import ListPagination from "./ListPagination";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  iconButtonRoot: {
    color: "#cc99cc",
    padding: "5px"
  },
  tableHeader: {
    backgroundColor: "#ff9966"
  },
  headerCell: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "mario"
  },
  grid: {
    marginTop: "10px"
  }
});

const AdminUserList = (props) => {
  const { setSnackbarStatus, setSnackbarMessage, setSnackbarSeverity } = props;
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const totalItems = useSelector((state) => state.admin.totalUsers);
  const [formName, setFormName] = useState("Default");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const page = getQueryParam(location, "page");
    if (!page) {
      let query = setQueryParam(location, "page", 1);
      query = setQueryParam(query, "sort", "firstName");
      query = setQueryParam(query, "dir", "asc");
      history.replace(`${location.pathname}?${query}`);
    } else {
      dispatch(fetchAdminUsers(location));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAdminUsers(location));
  }, [location.search]);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead className={muiClasses.tableHeader}>
            <TableRow>
              <TableCell className={muiClasses.headerCell}>First Name</TableCell>
              <TableCell className={muiClasses.headerCell}>Last Name</TableCell>
              <TableCell className={muiClasses.headerCell}>Email Address</TableCell>
              <TableCell className={muiClasses.headerCell}>Admin</TableCell>
              <TableCell className={muiClasses.headerCell}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setSelectedData(user);
                        setDialogStatus(true);
                        setFormName("Edit User");
                      }}
                      classes={{ root: muiClasses.iconButtonRoot }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton classes={{ root: muiClasses.iconButtonRoot }}>
                      <HighlightOffIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        className={muiClasses.grid}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start">
        <Grid item>
          <ListPagination items={users} totalItems={totalItems} />
        </Grid>
      </Grid>
      <AdminUserFormDialog
        setSnackbarStatus={setSnackbarStatus}
        setSnackbarMessage={setSnackbarMessage}
        dialogStatus={dialogStatus}
        user={selectedData}
        formName={formName}
        setDialogStatus={setDialogStatus}
        setSnackbarSeverity={setSnackbarSeverity}
      />
    </React.Fragment>
  );
};

export default AdminUserList;
