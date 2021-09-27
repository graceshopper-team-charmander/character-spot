import React from "react";

const StripeTest = () => {
  return (
    <form action="/charge/create-checkout-session" method="POST">
        <button type="submit" id="checkout-button">Checkout</button>
    </form>
  );
};

export default StripeTest;
