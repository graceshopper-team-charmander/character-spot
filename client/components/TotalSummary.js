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
  },
  text: {
    fontFamily: "mario"
  }
}));

const TotalSummary = (props) => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const cart = useSelector((state) => state.cart.cart) || [];

  const shipping = 500;
  const numItems = cart.length > 0 ? cart.reduce((acc, ele) => acc + ele.cartQuantity, 0) : 0;

  const subTotal =
    cart.length > 0 ? cart.reduce((acc, ele) => acc + ele.price * ele.cartQuantity, 0) : 0.0;

  return (
    <Card
      variant="outlined"
      style={{ margin: "10px", textAlign: "right" }}
      className={muiClasses.totalRoot}
    >
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
  );
};

export default TotalSummary;
