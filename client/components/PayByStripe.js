import React, { useState } from "react";
import { checkoutSession } from "../store/cart";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import SingleCheckoutProduct from "./SingleCheckoutProduct";
import TotalSummary from "./TotalSummary";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    backgroundColor: "#009edb",
    color: "white"
  },
  text: {
    fontFamily: "mario"
  }
}));

const PayByStripe = () => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const cart = useSelector((state) => state.cart.cart);
  const { firstName, guestEmailAddress, lastName } = useSelector((state) => state.cart.form);

  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    dispatch(checkoutSession(cart, firstName, guestEmailAddress, lastName, history));
  };
  return (
    <Grid item xs={12} className="cart-page">
      <div>
        <div className="cart-header" id="order-summary">
          <div className="cart-title">Order Summary</div>
        </div>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <div className="cart-body">
            <div>
              {cart.map((product) => {
                return <SingleCheckoutProduct key={product.id} product={product} />;
              })}
            </div>
            <TotalSummary />
            <Box style={{ margin: "10px", textAlign: "right" }}>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleSubmit}
                  className={muiClasses.buttonRoot}
                  id="checkout-button">
                  <h3 className={muiClasses.text}>Pay By Stripe</h3>
                </Button>
              </div>
            </Box>
          </div>
          <div className="img-container">
            <img src="/images/charizard.png" className="img-check-out-process" />
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default PayByStripe;
