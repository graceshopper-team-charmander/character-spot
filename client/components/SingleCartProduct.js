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
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    border: "8px solid #fcd000",
    borderRadius: "10px"
  },
  buttonRoot: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px"
  }
}));

const SingleCartProduct = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  const muiClasses = useStyles();
  return (
    <Card className={muiClasses.cardRoot} style={{ margin: "5px" }}>
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
            <div onClick={() => dispatch(updateQuantityThunk(product, product.cart.quantity - 1))}>
              <Button
                className={muiClasses.buttonRoot}>
                -
              </Button>
            </div>
            {product.cart.quantity}
            <div onClick={() => dispatch(updateQuantityThunk(product, product.cart.quantity + 1))}>
              <Button
                className={muiClasses.buttonRoot}>
                +
              </Button>
            </div>
            <div onClick={() => dispatch(deleteProductThunk(product))}>
              <DeleteIcon />
            </div>
          </CardActions>
        </Box>
        <Box sx={{ m: 2 }} style={{ flexGrow: 1 }}>
          <Typography style={{ textAlign: "right" }}>Price: ${(product.price * product.cart.quantity / 100).toLocaleString('en')}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SingleCartProduct;
