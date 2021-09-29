import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../store/wishlist";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import LoadingBar from "./LoadingBar";
import Grid from "@material-ui/core/Grid";
import WishlistProduct from "./WishlistProduct";

const Wishlist = (props) => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.wishlist.fetchStatus);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  if (fetchStatus === FETCH_PENDING)
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;

  return (
    <Grid item xs={12} className="wishlist-page">
      <div className="page-header">
        <div className="page-title">Wishlist</div>
      </div>
      <div className="page-body">
        {wishlist.map((product) => (
          <WishlistProduct product={product} />
        ))}
      </div>
    </Grid>
  );
};

export default Wishlist;
