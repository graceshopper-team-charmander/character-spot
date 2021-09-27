import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import { fetchSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";
import { updateQuantityThunk, addToCartThunk } from "../store/cart";
import { Link } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import NotFound from "./NotFound";
import { checkQuantity } from "./ProductRow";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { addToLocalCart } from "../store/localCart";

const useStyles = makeStyles((theme) => ({
  page: {
    paddingTop: "1rem"
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundImage: `url("/images/pokedex-background.png")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "600px",
    width: "80%",
    border: "25px solid gray",
    borderRadius: "25px",
    marginBottom: "1rem"
  },
  leftCol: {
    width: "45%",
    height: "100%"
  },
  rightCol: {
    width: "55%",
    paddingLeft: "2%"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#e71e07",
      transition: "all .4s ease"
    }
  },
  transparent: {
    color: "transparent"
  },
  navigator: {
    "&:hover": {
      // boxShadow: "0 0 10px 5px #cccccc",
      transition: "all .4s ease",
      // boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
      transform: "translate3d(0px, -10px, 0px)"
    },
    zIndex: 1
  }
}));

const SingleProducts = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct.product);
  const fetchStatus = useSelector((state) => state.singleProduct.fetchStatus);
  const styles = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const productsInCart = useSelector((state) => state.cart.cart);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarWarningOpen, setSnackBarWarningOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  //on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarWarningOpen(false);
  };

  if (fetchStatus === FETCH_PENDING)
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  else if (fetchStatus === FETCH_FAILED) return <NotFound />;

  return (
    <Grid
      container
      className={styles.page}
      direction="column"
      justifyContent="center"
      alignItems="center">
      <div className="all-products-header" id="single-product-header">
        <div className="all-products-title">Choose Your Character</div>
      </div>

      {/* top row */}
      <Grid container justifyContent="space-around" alignItems="center">
        {id > 1 ? (
          <Link to={`/products/${id - 1}`}>
            <NavigateBeforeRoundedIcon
              style={{ fontSize: 60 }}
              color="action"
              className={styles.navigator}
            />
          </Link>
        ) : (
          <NavigateBeforeRoundedIcon style={{ fontSize: 60 }} className={styles.transparent} />
        )}
        <Paper elevation={5} className={styles.topRow}>
          {/* <Grid
          container
          direction="row"
          className={styles.topRow}
          justifyContent="center"
          alignItems="stretch"> */}
          {/* left column */}

          <Grid container className={styles.leftCol} justifyContent="center" alignItems="center">
            <img className="single-product-img" src={product.imageUrl} alt={product.name}></img>
          </Grid>
          {/* right column */}
          <Grid
            container
            className={styles.rightCol}
            direction="column"
            justifyContent="space-around"
            alignItems="center">
            {/* top of right column */}
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <div className="single-product-title">{product.name}</div>
            </Grid>

            {/* middle of right column */}
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <div>{product.description}</div>
              <div>$ {product.price / 100}</div>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  if (checkQuantity(product, productsInCart)) {
                    setSnackBarOpen(true);
                    isLoggedIn ? dispatch(addToCartThunk(id)) : dispatch(addToLocalCart(product));
                  } else {
                    setSnackBarWarningOpen(true);
                    // alert(`There are no ${product.name}'s left to add to your cart!`);
                  }
                }}
                className={styles.button}>
                ADD TO CART
              </Button>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Paper>
        {/* NOTE - NEED TO FETCH PRODUCT LENGTH FOR LINE BELOW */}
        {id < 23 ? (
          <Link to={`/products/${+id + 1}`}>
            <NavigateNextRoundedIcon
              style={{ fontSize: 60 }}
              color="action"
              className={styles.navigator}
            />
          </Link>
        ) : (
          <NavigateBeforeRoundedIcon style={{ fontSize: 60 }} className={styles.transparent} />
        )}
      </Grid>
      <div className="all-products-header" id="single-product-header">
        <div className="all-products-title"></div>
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added to Cart!
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackBarWarningOpen}
        autoHideDuration={3000}
        onClose={handleWarningClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleWarningClose} severity="warning" sx={{ width: "100%" }}>
          There are no {product.name}s left to add to your cart!
        </Alert>
      </Snackbar>
      {/* bottom row  */}
      {/* <Grid container direction="column" justifyContent="flex-start" alignItems="center">
        <div className="single-product-sub-title">Reviews Or Something</div>
      </Grid> */}
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
