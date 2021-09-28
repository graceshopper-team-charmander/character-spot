import React, { useState } from "react";
import { submitOrderThunk, checkoutSession } from "../store/cart";
import { submitGuestOrderThunk } from "../store/localCart";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const PayByStripe = () => {
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const {firstName, guestEmailAddress, lastName } = useSelector((state) => state.cart.form);

  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  // const checkout = isLoggedIn ? checkoutSession : guestCheckoutSession;

  const history = useHistory();


   const handleSubmit = async (evt) => {
    evt.preventDefault()
    dispatch(checkoutSession(cart, firstName, guestEmailAddress, lastName, history))
   }
  return (
    <div>
      <h1> Order Summary </h1>
    <form >
        <button type="submit"  onClick = {handleSubmit}id="checkout-button">Checkout</button>
    </form>
    </div>
  );
};

export default PayByStripe;
