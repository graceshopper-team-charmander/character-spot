import React from "react";
import Address from "./Address";
import Shipping from "./Shipping";
import PaymentMethod from "./PaymentMethod";
import Button from "@material-ui/core/Button";
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    backgroundColor: "#3f51b5",
    color: "white"
  }
}));


const Checkout = (props) => {
  const muiClasses = useStyles();
  return (
    <div className="page checkout-page">
      <Address />
      <Shipping />
      <PaymentMethod />
    </div>
  );
};
export default Checkout;
