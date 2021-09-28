import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitGuestOrderThunk } from "../store/localCart";
import { submitOrderThunk } from "../store/cart";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: "mario",
    textAlign: "center"
  },
  base: {
    margin: "auto",
    width: "75%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "ghostwhite"
  },
  cardRoot: {
    margin: "20px",
    justifyContent: "center"
  }
}));

const Thankyou = (props) => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const {firstName, guestEmailAddress, lastName } = useSelector((state) => state.cart.form);

  const fetchCartStatus = useSelector((state) => state.cart.fetchStatus);

  const form = useSelector((state) => state.cart.form);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const submitOrder = isLoggedIn ? submitOrderThunk : submitGuestOrderThunk;

  useEffect(() => {
    if(fetchCartStatus === "FETCH_SUCCESS"){
      dispatch(submitOrder({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.guestEmailAddress
      }))
    }
  }, [fetchCartStatus]);

  return (
    <Box className = {muiClasses.base}>
      <Box className = {muiClasses.cardRoot}>
      <div style = {{textAlign: "center"}}>
      <h1 className={muiClasses.text}>Thank you for your order!</h1>
      <img
        src = "/images/charmander.png"
        style = {{maxWidth: "50%", padding: "30px"}}/>
      </div>
      <h1 className={muiClasses.text}>From Team Charmander</h1>
      </Box>
  </Box>
  )

};

export default Thankyou;
