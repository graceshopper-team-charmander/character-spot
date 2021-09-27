import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../constants";
import { setFetchSingleProductStatus, setSingleProduct } from "./singleProduct";
import { ADD_TO_LOCAL_CART, addToCart } from "./cart";

const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SUBMIT_ORDER = "SUBMIT_ORDER";

export const setLocalCart = () => {
  const cart = localStorage.getItem("characterSpotCart")
    ? JSON.parse(localStorage.getItem("characterSpotCart"))
    : [];
  return {
    type: SET_CART,
    cart
  };
};

export const clearLocalCart = () => {
  localStorage.setItem("characterSpotCart", JSON.stringify([]));
};

export const saveLocalCartOnUnload = (cart) => {
  localStorage.setItem("characterSpotCart", JSON.stringify(cart));
};

export const addToLocalCart = (product) => {
  product.cartQuantity = 1;
  return {
    type: ADD_TO_LOCAL_CART,
    product
  };
};

export const updateLocalCartQuantity = (product, quantity) => {
  if (!quantity) return deleteLocalCartProduct(product);
  product.cartQuantity = quantity;
  return {
    type: UPDATE_QUANTITY,
    product
  };
};

export const deleteLocalCartProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  };
};

const submitGuestOrder = (cart) => {
  return {
    type: SUBMIT_ORDER,
    cart
  };
};

export const submitGuestOrderThunk = (history, { firstName, lastName, guestEmailAddress }) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const body = {
        firstName,
        lastName,
        email: guestEmailAddress,
        cart: state.cart.cart
      };
      const { data } = await axios.put(`/api/users/guest-checkout`, body);
      dispatch(submitGuestOrder(data));
      // history.push("/thankyou");
    } catch (err) {
      console.log(err);
    }
  };
};
