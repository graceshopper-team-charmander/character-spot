import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SUBMIT_ORDER = "SUBMIT_ORDER";

const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  };
};

export const fetchLocalCart = () => {
  //load cart from localStorage
};

//fetch the item so we can put it in the on state
export const addToLocalCartThunk = (product) => {};

//we're not calling a backend for this, just increase the quantity on state
const updateLocalCartQuantity = (product) => {
  return {
    type: UPDATE_QUANTITY,
    product
  };
};

//not calling the backend, just delete from state
const deleteLocalCartProduct = (product) => {
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
