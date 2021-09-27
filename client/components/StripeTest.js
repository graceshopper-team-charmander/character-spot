import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import { chargeCard  } from "../store/charge"

const StripeTest = () => {
  const dispatch = useDispatch();
  return (
    <form action="/charge/create-checkout-session" method="POST">
        <button type="submit" id="checkout-button">Checkout</button>
    </form>
  );
};

export default StripeTest;
