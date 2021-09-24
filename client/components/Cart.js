import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cart";
import Box from "@material-ui/core/Box";
import SingleCartProduct from "./SingleCartProduct";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    backgroundColor: "#009edb",
    color: "white"
  },
  smallText: {
    fontWeight: 400,
    paddingBottom: "5px"
  },
  total: {
    fontWeight: 600,
    fontSize: "20px"
  },
  totalRoot: {
    border: "8px solid #44af35",
    borderRadius: "10px",
  }
}));

const Cart = () => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const cart = useSelector((state) => state.cart.cart) || [];

  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  const shipping = 500.

  const subTotal = (cart.length > 0) ? (cart.reduce((acc, ele) => acc + (ele.price * ele.cart.quantity), 0)) : (0.00)
  return (
    <Grid item xs={12}>
      <div className="form-header">
        <div className="form-title">Your New Friends (Cart)</div>
      </div>
      <div>
        {cart.map((product) => {
          return <SingleCartProduct key={product.id} product={product} />;
        })}
      </div>
      <Card
        variant="outlined"
        style = {{margin: "5px", textAlign: "right"}}
        className = {muiClasses.totalRoot}>
          <Box sx={{m: 2}}>
            <Typography
              className = {muiClasses.smallText}>
            Subtotal ({cart.length} {(cart.length === 1) ? "item": "items"}): ${(subTotal / 100).toLocaleString('en')}
            </Typography>
            <Typography
              className = {muiClasses.smallText}>
            Shipping: ${(shipping / 100.00).toFixed(2)}
            </Typography>
            <Typography
              className = {muiClasses.total}>
            Total: ${((subTotal + shipping )/ 100).toLocaleString('en')}
            </Typography>
          </Box>
      </Card>
      <Box
        style = {{margin: "5px", textAlign: "right"}}>
        <div>
          <Link to={`/checkout`}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={muiClasses.buttonRoot}
              >Checkout</Button>
          </Link>
        </div>
      </Box>
    </Grid>
  );
};

export default Cart;
