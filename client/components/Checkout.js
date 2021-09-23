import React, { useState } from "react";
import Address from "./Address";
import Shipping from "./Shipping";
import PaymentMethod from "./PaymentMethod";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    backgroundColor: "#009edb",
    color: "white"
  }
}));

const Checkout = (props) => {
  const muiClasses = useStyles();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div className="page">
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Address />
        </Grid>
        <Grid item>
          <Shipping />
        </Grid>
        <Grid item>
          <PaymentMethod />
        </Grid>
        <Grid item>
          <div className="form-actions">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={muiClasses.buttonRoot}
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={() => {
               setSnackBarOpen(true);
              }}>
              Place Order
            </Button>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: "100%" }}>
          Submitting Order...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
