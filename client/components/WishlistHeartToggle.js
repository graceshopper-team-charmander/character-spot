import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addToWishlistThunk, deleteFromWishlistThunk } from "../store/wishlist";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  favorite: {
    alignSelf: "center",
    height: "24px",
    marginLeft: "10px"
  }
}));

const WishlistHeartToggle = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const { product } = props;
  const muiClasses = useStyles();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const inWishlist = wishlist.find((wishlistItem) => wishlistItem.id === product.id);
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();
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

  const handleFavoriteToggle = async (evt) => {
    evt.preventDefault();
    const thunk = inWishlist ? deleteFromWishlistThunk : addToWishlistThunk;
    setSnackBarMessage(inWishlist ? "Removed from Favorites :(" : "Added to Favorites! Yay!");
    const thunkResult = await dispatch(thunk(product.id));
    if (thunkResult) {
      setSnackBarOpen(true);
    }
  };

  return (
    isLoggedIn && (
      <>
        {inWishlist ? (
          <FavoriteIcon className={muiClasses.favorite} onClick={handleFavoriteToggle} />
        ) : (
          <FavoriteBorderIcon className={muiClasses.favorite} onClick={handleFavoriteToggle} />
        )}
        <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </>
    )
  );
};

export default WishlistHeartToggle;
