import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cart";
// import SingleCartProduct from "./SingleCartProduct"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart) || [];

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <Grid item xs={12}>
      <Paper elevation={1}>
        <div className="form-header">
          <div className="form-title">Your New Friends (Cart)</div>
        </div>
        <div>
          {/* TEMP FOR WHEN SINGLECART */}
          {cart.map((product) => {
            return <div key={product.id}>{product.name}</div>;
          })}
          {/* <SingleCartProduct key={product.id} product={product} /> */}
        </div>
      </Paper>
    </Grid>
  );
};

export default Cart;
