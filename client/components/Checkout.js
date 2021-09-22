import React from "react";
import Address from "./Address";
import Shipping from "./Shipping";
import PaymentMethod from "./PaymentMethod";

const Checkout = (props) => (
  <div className="page checkout-page">
    <Address />
    <Shipping />
    <PaymentMethod />
  </div>
);
export default Checkout;
