/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
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

function checkQuantity(product) {
  if (product.quantity - product.cartQuantity <= 0) {
    alert(`There are only ${product.quantity} ${product.name}(s) left in stock`);
    return false;
  }
  return true;
}

const SingleCartProduct = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  const muiClasses = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const updateQuantity = isLoggedIn ? updateQuantityThunk : updateLocalCartQuantity;
  const deleteProduct = isLoggedIn ? deleteProductThunk : deleteLocalCartProduct;
  return (
    <Card className={muiClasses.cardRoot}>
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          style={{ height: 100, width: "auto", margin: "10px" }}
          image={`${product.imageUrl}`}
        />
        <Box sx={{ m: 2 }}>
          <Typography style={{ fontWeight: 600, fontSize: 20 }}>{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <CardActions style={{ padding: "0px" }}>
            <div onClick={() => dispatch(updateQuantity(product, product.cartQuantity - 1))}>
              <Button className={muiClasses.buttonRoot}>-</Button>
            </div>
            {product.cartQuantity}
            <div
              onClick={() => {
                if (checkQuantity(props.product)) {
                  dispatch(updateQuantity(product, product.cartQuantity + 1));
                }
              }}>
              <Button className={muiClasses.buttonRoot}>+</Button>
            </div>
            <div onClick={() => dispatch(deleteProduct(product))}>
              <Button className={muiClasses.buttonRoot}>
                <DeleteIcon />
              </Button>
            </div>
          </CardActions>
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

export default SingleCartProduct;
