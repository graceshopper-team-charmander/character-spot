/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantityThunk, deleteProductThunk } from "../store/cart";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteLocalCartProduct, updateLocalCartQuantity } from "../store/localCart";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    border: "8px solid #fcd000",
    borderRadius: "10px",
    margin: "10px"
  },
  buttonRoot: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px"
  }
}));

const SingleCheckoutProduct = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  const muiClasses = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Card className={muiClasses.cardRoot}>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          style={{ height: 100, width: 100, objectFit: "contain", margin: "10px" }}
          image={`${product.imageUrl}`}
        />
        <Box sx={{ m: 2 }}>
          <Typography style={{ fontWeight: 600, fontSize: 20 }}>{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <br />
          Quantity: {product.cartQuantity}
        </Box>
        <Box sx={{ m: 2 }} style={{ flexGrow: 1 }}>
          <Typography style={{ textAlign: "right" }}>
            Price: $
            {((product.price * product.cartQuantity) / 100).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SingleCheckoutProduct;
