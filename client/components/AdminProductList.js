import React, { useEffect, useState } from "react";
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
import { adminDeleteProductThunk, fetchAdminProducts } from "../store/admin";
import AdminProductFormDialog from "./AdminProductFormDialog";
import { useHistory, useLocation } from "react-router-dom";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import ListPagination from "./ListPagination";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  addButton: {
    backgroundColor: "#009edb",
    color: "white",
    fontStyle: "bold",
    "&:hover": {
      backgroundColor: "#fcd000"
    },
    marginBottom: "10px"
  },
  buttonLabel: {
    fontFamily: "mario"
  },
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

const AdminProductList = (props) => {
  const { setSnackbarStatus, setSnackbarMessage, setSnackbarSeverity } = props;
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.admin.products);
  const totalItems = useSelector((state) => state.admin.totalItems);
  const [formName, setFormName] = useState("Default");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [dialogMode, setDialogMode] = useState("edit");
  const history = useHistory();
  useEffect(() => {
    const page = getQueryParam(location, "page");
    if (!page) {
      let query = setQueryParam(location, "page", 1);
      query = setQueryParam(query, "sort", "name");
      query = setQueryParam(query, "dir", "asc");
      history.replace(`${location.pathname}?${query}`);
    } else {
      dispatch(fetchAdminProducts(location));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAdminProducts(location));
  }, [location.search]);

  return (
    <React.Fragment>
      <div className="wishlist-buttons">
        <Button
          classes={{ root: muiClasses.addButton, label: muiClasses.buttonLabel }}
          onClick={() => {
            setSelectedData({});
            setDialogStatus(true);
            setFormName("Add New Product");
            setDialogMode("add");
          }}>
          Add New Product
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead className={muiClasses.tableHeader}>
            <TableRow>
              <TableCell className={muiClasses.headerCell}>Product</TableCell>
              <TableCell className={muiClasses.headerCell}>Price</TableCell>
              <TableCell className={muiClasses.headerCell}>Quantity</TableCell>
              <TableCell className={muiClasses.headerCell}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price / 100}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setSelectedData(product);
                        setDialogMode("edit");
                        setDialogStatus(true);
                        setFormName("Edit Product");
                      }}
                      classes={{ root: muiClasses.iconButtonRoot }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete"
                    onClick={async () => {
                      const success = await dispatch(adminDeleteProductThunk(product.id));
                      if (success) {
                        setSnackbarMessage("Deleted " + product.name);
                      } else {
                        setSnackbarMessage("Failed to delete " + product.name);
                      }
                      setSnackbarStatus(true);
                    }}>
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
          <ListPagination items={products} totalItems={totalItems} />
        </Grid>
      </Grid>
      <AdminProductFormDialog
        dialogMode={dialogMode}
        setSnackbarStatus={setSnackbarStatus}
        setSnackbarMessage={setSnackbarMessage}
        dialogStatus={dialogStatus}
        product={selectedData}
        formName={formName}
        setDialogStatus={setDialogStatus}
        setSnackbarSeverity={setSnackbarSeverity}
      />
    </React.Fragment>
  );
};

export default AdminProductList;
