import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCartProduct from "./SingleCartProduct";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import LoadingBar from "./LoadingBar";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    backgroundColor: "#009edb",
    color: "white"
  },
  smallText: {
    fontWeight: 400,
    paddingBottom: "5px"
  },
  total: {
    fontWeight: 600,
    fontSize: "20px"
  },
  totalRoot: {
    border: "8px solid #44af35",
    borderRadius: "10px"
  }
}));

function checkProductQuantities(cart) {
  // query for that product, check quantity

  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];
    if (product.quantity - product.cartQuantity < 0) {
      alert(`There are only ${product.quantity} ${product.name}(s) left in stock`);
      return false;
    }
  }
  return true;
}

const Cart = () => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const cart = useSelector((state) => state.cart.cart) || [];
  const fetchStatus = useSelector((state) => state.cart.fetchStatus);

  const shipping = 500;
  const numItems = cart.length > 0 ? cart.reduce((acc, ele) => acc + ele.cartQuantity, 0) : 0;

  const subTotal =
    cart.length > 0 ? cart.reduce((acc, ele) => acc + ele.price * ele.cartQuantity, 0) : 0.0;

  // useEffect(() => {

  // })

  const history = useHistory();

  const routeChange = () => {
    let path = `/checkout`;
    history.push(path);
  };

  if (fetchStatus === FETCH_PENDING)
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;

  return (
    <Grid item xs={12} className="cart-page">
      <div className="cart-header">
        <div className="cart-title">Your New Friends (Cart)</div>
      </div>
      <div className="cart-body">
        <div>
          {cart.map((product) => {
            return <SingleCartProduct key={product.id} product={product} />;
          })}
        </div>
        <Card
          variant="outlined"
          style={{ margin: "10px", textAlign: "right" }}
          className={muiClasses.totalRoot}>
          <Box sx={{ m: 2 }}>
            <Typography className={muiClasses.smallText}>
              Subtotal ({numItems} {numItems === 1 ? "item" : "items"}): $
              {(subTotal / 100).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Typography>
            <Typography className={muiClasses.smallText}>
              Shipping: $
              {(shipping / 100.0).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Typography>
            <Typography className={muiClasses.total}>
              Total: $
              {((subTotal + shipping) / 100).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Typography>
          </Box>
        </Card>
        <Box style={{ margin: "10px", textAlign: "right" }}>
          <div>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={muiClasses.buttonRoot}
              onClick={() => {
                if (checkProductQuantities(cart)) {
                  routeChange();
                }
              }}>
              Checkout
            </Button>
          </div>
        </Box>
      </div>
    </Grid>
  );
};

export default Cart;
