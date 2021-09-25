import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../constants";
import { setFetchSingleProductStatus, setSingleProduct } from "./singleProduct";
import { addToCart } from "./cart";

const ADD_TO_CART = "ADD_TO_CART";
const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SUBMIT_ORDER = "SUBMIT_ORDER";

export const setLocalCart = () => {
  const cart = localStorage.getItem("characterStopCart")
    ? JSON.parse(localStorage.getItem("characterStopCart"))
    : [];
  return {
    type: SET_CART,
    cart
  };
};

export const clearLocalCart = () => {
  localStorage.setItem("characterStopCart", JSON.stringify([]));
};

export const saveLocalCartOnUnload = (cart) => {
  localStorage.setItem("characterStopCart", JSON.stringify(cart));
};

export const addToLocalCartThunk = (product) => {
  product.cartQuantity = 1;
  return {
    type: ADD_TO_CART,
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

export const submitGuestOrderThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/guest-checkout`);
      dispatch(submitGuestOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};
