import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitGuestOrderThunk } from "../store/localCart";
import { submitOrderThunk } from "../store/cart";

const Thankyou = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const {firstName, guestEmailAddress, lastName } = useSelector((state) => state.cart.form);
  const currState = useSelector((state) => state);
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const submitOrder = isLoggedIn ? submitOrderThunk : submitGuestOrderThunk;

  if(cart.length > 0) {
    dispatch(submitOrderThunk())
  }
  return (
    <div>Thanks for your order!</div>
  )

};

export default Thankyou;
