import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import LoadingBar from "./LoadingBar";
import { updateQuantityThunk, addToCartThunk } from "../store/cart";
import { addToLocalCart } from "../store/localCart";
import { checkQuantity } from "./ProductRow";
import { Link } from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "200px",
    height: "250px",
    "&:hover": {
      transition: "all .4s ease",
      boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
      transform: "translate3d(0px, -10px, 0px)"
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem"
  },
  grid: {
    height: "450px",
    borderBottom: "solid 2px gray",
    backgroundColor: "#e71e07"
    // marginBottom: "2rem"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#44af35",
      transition: "all .4s ease"
    },
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  cards: {
    width: "200px"
  }
}));

const HomeFeaturedProducts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const fetchStatus = useSelector((state) => state.products.fetchStatus);
  const productsInCart = useSelector((state) => state.cart.cart);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const featuredProducts = [];
  const productsIds = [11, 7, 13, 17];
  for (let i = 0; i < productsIds.length; i++) {
    // let productIndex = Math.floor(Math.random() * products.length);
    let product = products.filter((product) => product.id === productsIds[i]);
    featuredProducts.push(product[0]);
  }

  // const featuredProducts = [
  //   { name: "Daisy", img: "/images/daisy.png" },
  //   { name: "Peach", img: "/images/peach.png" },
  //   { name: "Mario", img: "/images/mario.png" },
  //   { name: "Luigi", img: "/images/luigi.png" }
  // ];
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [snackBarWarningOpen, setSnackBarWarningOpen] = useState(false);
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

  if (fetchStatus === FETCH_PENDING) {
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  }
  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start">
      <div className="featured-header">
        <div className="featured-title">Featured Characters</div>
      </div>
      {featuredProducts.map((product, i) => (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          key={i}
          className={classes.cards}>
          <Card className={classes.card}>
            <Link to={`/products/${product.id}`}>
              <CardContent>
                <img src={product.imageUrl} className="featured-img"></img>
              </CardContent>
            </Link>
          </Card>
          <Button
            variant="contained"
            onClick={() => {
              if (checkQuantity(product, productsInCart)) {
                setSnackBarOpen(true);
                isLoggedIn
                  ? dispatch(addToCartThunk(product.id))
                  : dispatch(addToLocalCart(product));
              } else {
                setSnackBarWarningOpen(true);
                // alert(`There are no ${product.name}'s left to add to your cart!`);
              }
            }}
            className={classes.button}>
            <div className="single-button">ADD TO CART</div>
          </Button>
        </Grid>
      ))}
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
          Limited stock! Not enough to add to cart!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default HomeFeaturedProducts;
