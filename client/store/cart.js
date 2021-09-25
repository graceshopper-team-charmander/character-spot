import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../constants";

const ADD_TO_CART = "ADD_TO_CART";
const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SUBMIT_ORDER = "SUBMIT_ORDER";

export const SET_CART_FETCH_STATUS = "SET_CART_FETCH_STATUS";

export const setFetchCartStatus = (status) => {
  return {
    type: SET_CART_FETCH_STATUS,
    status
  };
};

const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchCartStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/users/cart`);
      dispatch(setCart(data));
      dispatch(setFetchCartStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchCartStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

const addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart
  };
};

export const addToCartThunk = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/cart/${productId}`);
      dispatch(addToCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const updateQuantity = (product) => {
  return {
    type: UPDATE_QUANTITY,
    product
  };
};

export const updateQuantityThunk = (product, quantity) => {
  if (quantity === 0) {
    return deleteProductThunk(product);
  } else {
    return async (dispatch, getState) => {
      try {
        // const state = getState()
        const { data } = await axios.put(`/api/users/cart/${product.id}`, { quantity: quantity });
        dispatch(updateQuantity(data));
      } catch (err) {
        console.log(err);
      }
    };
  }
};

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  };
};

export const deleteProductThunk = (product) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/cart/${product.id}`);
      dispatch(deleteProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

const submitOrder = (cart) => {
  return {
    type: SUBMIT_ORDER,
    cart
  };
};

export const submitOrderThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/checkout`);
      dispatch(submitOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = { fetchStatus: FETCH_PENDING, cart: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.cart };
    case ADD_TO_CART:
      return { ...state, cart: action.cart };
    case UPDATE_QUANTITY:
      const updatedProducts = state.cart.map((product) => {
        if (product.id === action.product.id) {
          return action.product;
        } else {
          return product;
        }
      });
      return { ...state, cart: updatedProducts };
    case DELETE_PRODUCT:
      const updatedCart = state.cart.filter((product) => product.id !== action.product.id);
      return { ...state, cart: updatedCart };
    case SUBMIT_ORDER:
      return { ...state, cart: [] };
    case SET_CART_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    default:
      return state;
  }
};
