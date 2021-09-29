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
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addToWishlistThunk, deleteFromWishlistThunk } from "../store/wishlist";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import WishlistHeartToggle from "./WishlistHeartToggle";

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
    paddingLeft: "2%",
    margin: "6% 4%"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#e71e07",
      transition: "all .4s ease"
    },
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    marginLeft: "1.2em"
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
  },
  descContainer: {
    width: "80%",
    height: "200px",
    backgroundColor: "lightgray",
    margin: "1em 0",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  actions: {
    display: "flex",
    flexDirection: "row"
  },
  favorite: {
    alignSelf: "center",
    height: "24px",
    marginLeft: "10px"
  },
  descLeft: {
    width: "35%",
    height: "100%",
    padding: "20px 10px",
    fontWeight: "bold"
  },
  descRight: {
    width: "65%",
    height: "100%",
    backgroundColor: "white",
    padding: "20px 10px"
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
  const products = useSelector((state) => state.products.products);

  let categories = product.categories || [];
  categories = categories.map((category) => category.name).join(", ");

  //on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0";
    script.async = true;
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("nonce", "PfgteS8h");

    document.body.appendChild(script);
    return () => {
      console.log(script);
      document.body.removeChild(script);
    };
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
  else if (fetchStatus === FETCH_FAILED) {
    const error = 404;
    const message = "OOPS! PAGE NOT FOUND";
    return (
      <div>
        <NotFound error={error} message={message} />
      </div>
    );
  }

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
            justifyContent="center"
            alignItems="center">
            {/* top of right column */}
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="title-container">
              <div className="single-product-title">{product.name}</div>
            </Grid>

            {/* middle of right column */}
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={styles.descContainer}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                className={styles.descLeft}>
                <div className="top" id="top-left">
                  Category
                </div>

                <div>Description</div>

                <div className="bottom" id="bottom-left">
                  {" "}
                  Price{" "}
                </div>
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                className={styles.descRight}>
                <div className="top">{categories}</div>

                <div>{product.description}</div>

                <div className="bottom">$ {product.price / 100}</div>
              </Grid>
            </Grid>
            <Grid item className={styles.actions}>
              <WishlistHeartToggle product={product} />
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
                <div className="single-button">ADD TO CART</div>
              </Button>
              <div className="share">
                <div
                  className="fb-share-button"
                  data-href={`https://character-spot.herokuapp.com/products/${id}`}
                  data-layout="button"
                  data-size="large">
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fproducts%2F5&amp;src=sdkpreparse`}
                    className="fb-xfbml-parse-ignore">
                    Share
                  </a>
                </div>
              </div>
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
