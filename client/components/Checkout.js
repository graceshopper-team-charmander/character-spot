import React, { useState } from "react";
import Address from "./Address";
import Shipping from "./Shipping";
import PaymentMethod from "./PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { submitOrderThunk, validateCheckoutInfo } from "../store/cart";
import { submitGuestOrderThunk } from "../store/localCart";
import GuestCheckoutForm from "./GuestCheckoutForm";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    backgroundColor: "#009edb",
    color: "white"
  }
}));

const Checkout = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const validationSchema = Yup.object().shape({
    ...(!isLoggedIn
      ? {
          guestEmailAddress: Yup.string()
            .trim()
            .required("An email address is required to checkout")
            .email("Must be a valid email address"),
          firstName: Yup.string().trim().required("First name is required"),
          lastName: Yup.string().trim().required("Last name is required")
        }
      : {})
  });

  const validation = Yup.object().shape();
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  const loggedInUserFirstName = useSelector((state) => state.auth.firstName);
  const loggedInUserLastName = useSelector((state) => state.auth.lastName);
  const loggedInUserEmail = useSelector((state) => state.auth.email);

  // const submitOrder = isLoggedIn ? submitOrderThunk : submitGuestOrderThunk;
  const history = useHistory();
  const [formState, setFormState] = useState({
    guestEmailAddress: loggedInUserEmail,
    firstName: loggedInUserFirstName,
    lastName: loggedInUserLastName,
    errors: {
      firstName: false,
      lastName: false,
      guestEmailAddress: false
    }
  });
  // const [snackBarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (evt) => {
    const newState = { ...formState };
    const newErrors = newState.errors;
    try {
      await validationSchema.validate(newState, { abortEarly: false });
      const { guestEmailAddress } = newState;
      for (let key in newErrors) {
        newErrors[key] = false;
      }
      // setSnackbarMessage("Submitting Order...");
      // setSnackBarOpen(true);
      dispatch(validateCheckoutInfo(history,formState));
      // dispatch(submitOrder(history,formState));
    } catch (err) {
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
    }
    // setFormState(newState);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h4 className="checkout-title">Checkout</h4>
      </div>
      <div className="page">
        <Grid container spacing={2} direction="column">
          <Grid item>
            <GuestCheckoutForm formState={formState} setFormState={setFormState} />
          </Grid>
          <Grid item>
            <Address />
          </Grid>
          <Grid item>
            <Shipping />
          </Grid>
          {/* <Grid item>
            <PaymentMethod />
          </Grid> */}
          <Grid item>
            <div className="form-actions">
              <Button
                size="large"
                variant="contained"
                color="secondary"
                className={muiClasses.buttonRoot}
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={handleSubmit}>
                Proceed to Payment
              </Button>
            </div>
          </Grid>
        </Grid>
        {/* <Snackbar
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackBarOpen(false)}>
          <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: "100%" }}>
            {snackBarMessage}
          </Alert>
        </Snackbar> */}
      </div>
    </div>
  );
};

export default Checkout;
