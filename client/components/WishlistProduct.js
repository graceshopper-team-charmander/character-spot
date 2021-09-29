/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantityThunk, deleteProductThunk, addToCart, addToCartThunk } from "../store/cart";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteLocalCartProduct, updateLocalCartQuantity } from "../store/localCart";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { deleteFromWishlist, deleteFromWishlistThunk } from "../store/wishlist";

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
  },
  addButton: {
    backgroundColor: "#009edb",
    color: "white",
    fontStyle: "bold",
    "&:hover": {
      backgroundColor: "#fcd000"
    }
  },
  deleteButton: {
    backgroundColor: "#e71e07",
    color: "white",
    fontStyle: "bold",
    "&:hover": {
      backgroundColor: "#fcd000",
      color: "#e71e07"
    }
  },
  buttonLabel: {
    fontFamily: "mario"
  }
}));

function checkQuantity(product) {
  if (product.quantity - product.cartQuantity <= 0) {
    // alert(`Limited stock! Unable to add any more ${product.name}s to your cart!`);
    return false;
  }
  return true;
}

const WishlistProduct = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  const muiClasses = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const [snackBarWarningOpen, setSnackBarWarningOpen] = useState(false);

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarWarningOpen(false);
  };

  return (
    <Card className={muiClasses.cardRoot}>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          style={{ height: 100, width: 100, margin: "10px", objectFit: "contain" }}
          image={`${product.imageUrl}`}
        />
        <Box sx={{ m: 2 }}>
          <Typography style={{ fontWeight: 600, fontSize: 20 }}>{product.name}</Typography>
          <Typography>{product.description}</Typography>
        </Box>
        <div className="wishlist-right">
          <Typography style={{ textAlign: "right" }}>
            Price: $
            {(product.price / 100).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Typography>
          <div className="wishlist-buttons">
            <Button
              classes={{ root: muiClasses.addButton, label: muiClasses.buttonLabel }}
              onClick={() => dispatch(addToCartThunk(product.id))}>
              Add To Cart
            </Button>
            <Button
              classes={{ root: muiClasses.deleteButton, label: muiClasses.buttonLabel }}
              onClick={() => dispatch(deleteFromWishlistThunk(product.id))}>
              Delete
            </Button>
          </div>
        </div>
      </Box>
    </Card>
  );
};

export default WishlistProduct;
