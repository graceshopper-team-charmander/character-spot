/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk } from "../store/cart";
import { addToLocalCart } from "../store/localCart";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0 20px 50px 20px",
    height: "280px",
    width: "200px",
    border: "8px solid #fcd000",
    borderRadius: "10px",
    "&:hover": {
      transition: "all .4s ease",
      boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
      transform: "translate3d(0px, -10px, 0px)"
    },
    display: "flex",
    flexDirection: "column",
    backgroundImage: "linear-gradient(180deg, ghostwhite, #FFF3E0)"
  },
  cardContent: {
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    height: "70%"
  },
  cardImage: {
    borderRadius: "2px",
    border: "5px solid #fcd000",
    objectFit: "contain",
    backgroundImage: "linear-gradient(180deg, white, #fc7947)"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#e71e07",
      transition: "all .4s ease"
    },
    margin: "5x",
    width: "150px",
    alignSelf: "center"
  },
  cardBody: {
    display: "flex",
    flexGrow: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardPrice: {
    marginTop: "20px",
    color: "#484848",
    "&:hover": {
      color: "#616161"
    }
  },
  cardTitle: {
    color: "#484848",
    "&:hover": {
      color: "#616161"
    },
    marginLeft: "2px",
    fontWeight: "bold"
  }
}));

export function checkQuantity(product, productsInCart) {
  const productToCheck = productsInCart.filter((cartProduct) => cartProduct.id === product.id);
  if (productToCheck.length) {
    const qtyInCart = productToCheck[0].cartQuantity;
    if (product.quantity - qtyInCart < 1) {
      return false;
    }
  } else {
    if (product.quantity < 1) {
      return false;
    }
  }
  return true;
}

const ProductRow = (props) => {
  const styles = useStyles();
  const { product } = props;
  const { id, name, description, price, imageUrl } = product;
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const productsInCart = useSelector((state) => state.cart.cart);

  return (
    <div>
      <Card className={styles.card}>
        <Link to={`/products/${id}`}>
          <CardContent className={styles.cardContent}>
            <Typography sx={{ fontSize: 10 }} className={styles.cardTitle} id="card-title">
              {name}
            </Typography>
            <div className={styles.cardBody}>
              <CardMedia
                className={styles.cardImage}
                component="img"
                height="120"
                image={imageUrl}
                alt={name}
              />
              <Typography sx={{ mb: 1.5 }} className={styles.cardPrice}>
                ${(price / 100).toFixed(2)}
              </Typography>
            </div>
          </CardContent>
        </Link>
        <Button
          variant="contained"
          onClick={() => {
            if (checkQuantity(product, productsInCart)) {
              setSnackBarOpen(true);
              isLoggedIn ? dispatch(addToCartThunk(id)) : dispatch(addToLocalCart(product));
            } else {
              alert(`There are no ${product.name}'s left to add to your cart!`);
            }
          }}
          className={styles.button}>
          <span className="button-font">ADD TO CART</span>
        </Button>
      </Card>
      <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={() => setSnackBarOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: "100%" }}>
          Added to Cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductRow;
