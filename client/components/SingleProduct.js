import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../constants";
import { fetchSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { updateQuantityThunk, addToCartThunk } from "../store/cart";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  page: {
    margin: "3%"
  },
  leftCol: {
    width: "50%"
  },
  rightCol: {
    width: "50%",
    paddingLeft: "2%"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#e71e07",
      transition: "all .4s ease"
    }
  }
}));

const SingleProducts = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct.product);
  const fetchStatus = useSelector((state) => state.singleProduct.fetchStatus);

  const styles = useStyles();

  //on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id]);

  if (fetchStatus === FETCH_PENDING) return <div>Loading</div>;
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;

  return (
    <Grid
      container
      className={styles.page}
      direction="column"
      justifyContent="center"
      alignItems="center">
      {/* top row */}
      <Grid container direction="row" justifyContent="center" alignItems="stretch">
        {/* left column */}
        <Grid container className={styles.leftCol} justifyContent="flex-end">
          <img className="single-product-img" src={product.imageUrl} alt={product.name}></img>
        </Grid>
        {/* right column */}
        <Grid
          container
          className={styles.rightCol}
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start">
          {/* top of right column */}
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <div className="single-product-title">{product.name}</div>
            <div>{product.price / 100}</div>
          </Grid>
          {/* bottom of right column */}
          <Grid item>
            <Button
              variant="contained"
              onClick={() => dispatch(addToCartThunk(id))}
              className={styles.button}>
              ADD TO CART
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <hr className="divider" />
      {/* bottom row */}
      <Grid container direction="column" justifyContent="flex-start" alignItems="center">
        <div className="single-product-sub-title">Product Description</div>
        <div>{product.description}</div>
      </Grid>
    </Grid>
  );
};

export default SingleProducts;

// Updating Quantity - for later
{
  /* <div onClick={() => dispatch(updateQuantityThunk(product, product.cart.quantity - 1))}>
  <button>-</button>
</div>;
{product.cart.quantity}
<div onClick={() => dispatch(updateQuantityThunk(product, product.cart.quantity + 1))}>
  <button>+</button>
</div>; */
}
