import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCartProduct from "./SingleCartProduct";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import LoadingBar from "./LoadingBar";
import { fetchProducts } from "../store/products";
import NotFound from "./NotFound";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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

var limitedProduct = "";

function checkProductQuantities(cart) {
  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];
    if (product.quantity - product.cartQuantity < 0) {
      // alert(`Limited stock! Must reduce number of ${product.name}s in your cart!`);
      limitedProduct = product.name;
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
  const [snackBarWarningOpen, setSnackBarWarningOpen] = useState(false);

  const shipping = 500;
  const numItems = cart.length > 0 ? cart.reduce((acc, ele) => acc + ele.cartQuantity, 0) : 0;

  const subTotal =
    cart.length > 0 ? cart.reduce((acc, ele) => acc + ele.price * ele.cartQuantity, 0) : 0.0;

  const products = useSelector((state) => state.products.products);

  const history = useHistory();

  const routeChange = () => {
    let path = `/checkout`;
    history.push(path);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarWarningOpen(false);
  };

  if (fetchStatus === FETCH_PENDING) {
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    const error = 500;
    const message = "OOPS! SERVER ERROR";
    return (
      <div>
        <NotFound error={error} message={message} />
      </div>
    );
  }

  return (
    <Grid item xs={12} className="cart-page">
      <Snackbar
        open={snackBarWarningOpen}
        autoHideDuration={4000}
        onClose={handleWarningClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleWarningClose} severity="warning" sx={{ width: "100%" }}>
          Limited stock! Must reduce number of {limitedProduct}s in your cart!
        </Alert>
      </Snackbar>
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
                } else {
                  setSnackBarWarningOpen(true);
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
