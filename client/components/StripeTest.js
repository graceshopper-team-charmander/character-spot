import React, { useState }from "react";
import { submitOrderThunk, checkoutSession } from "../store/cart";
import { submitGuestOrderThunk } from "../store/localCart";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const StripeTest = () => {
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const {firstName, guestEmailAddress, lastName } = useSelector((state) => state.cart.form);

  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const submitOrder = isLoggedIn ? submitOrderThunk : submitGuestOrderThunk;

  const history = useHistory();

   // const [snackBarMessage, setSnackbarMessage] = useState("");

   const handleSubmit = async (evt) => {
     evt.preventDefault()
     console.log('CHECKOUT BUTTON CLICKED-------')
    // setSnackbarMessage("Submitting Order...");
     // setSnackBarOpen(true);
    dispatch(checkoutSession(cart, firstName, guestEmailAddress, lastName))
    // dispatch(submitOrder(history));
   }
  return (
    <div>
      <h1> Order Summary </h1>
    <form >
    {/* action="/charge/create-checkout-session" method="POST" */}
        <button type="submit"  onClick = {handleSubmit}id="checkout-button">Checkout</button>
    </form>
    </div>
  );
};

export default StripeTest;
