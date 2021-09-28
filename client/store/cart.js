import axios from "axios";
import { LOGOUT } from "./auth";
import { clearLocalCart, setLocalCart } from "./localCart";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../constants";
import products from "./products";

export const SET_CART_FETCH_STATUS = "SET_CART_FETCH_STATUS";
const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TO_LOCAL_CART = "ADD_TO_LOCAL_CART";
const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SUBMIT_ORDER = "SUBMIT_ORDER";
const STORE_CHECKOUT_INFO = "STORE_CHECKOUT_INFO"

export const initCart = (dispatch, state) => {
  const localCart = JSON.parse(localStorage.getItem("characterSpotCart"));
  if (!state.auth.loggedIn) {
    //user not logged in
    if (localCart.length) {
      dispatch(setLocalCart(localCart)); //set redux cart from localStorage
    }
    dispatch(setFetchCartStatus(FETCH_SUCCESS));
    //when not logged in, and the user has nothing in local storage
  } else {
    //user logged in
    if (localCart.length) {
      dispatch(setCartThunk(localCart)); //merge localStorage with DB
      clearLocalCart();
    } else if (state.cart.cart.length) {
      dispatch(setCartThunk(state.cart.cart)); //merge redux with DB
    } else {
      dispatch(fetchCart()); //fetch cart from DB
    }
  }
};

export const setCartThunk = (cart) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchCartStatus(FETCH_PENDING));
      const { data } = await axios.post(`/api/users/cart`, cart);
      dispatch(setCart(data));
      dispatch(setFetchCartStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchCartStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};
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

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
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

const submitOrder = () => {
  return {
    type: SUBMIT_ORDER,
  };
};

const storeCheckoutInfo = (formState) => {
  return {
    type: STORE_CHECKOUT_INFO,
    formState
  };
};

export const validateCheckoutInfo = (history, formState) => {
  return async (dispatch) => {
    try {
      dispatch(storeCheckoutInfo(formState));
      history.push("/payment");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

export const checkoutSession = (cart, firstName, guestEmailAddress, lastName, orderId, history) => {
  return async (dispatch) => {
    console.log('checkout session thunk')
    try {
      const { data } = await axios.post(`/charge/create-checkout-session`, {cart, firstName, guestEmailAddress, lastName, orderId});
      window.location.href = data
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

export const submitOrderThunk = () => {
  console.log('**** IN THE SUBMIT ORDER THUNK****')
  return async (dispatch) => {
    try {
      await axios.put(`/api/users/checkout`);
      dispatch(submitOrder());
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

let initialState = { fetchStatus: FETCH_PENDING, cart: [], form: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.cart };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart.filter((product) => product.id !== action.product.id), action.product]
      };
    case ADD_TO_LOCAL_CART: {
      const cart = [...state.cart];
      const productExists = state.cart.find((item) => item.id === action.product.id); //check if it exists in cart
      if (productExists) {
        productExists.cartQuantity += 1;
      } else {
        action.product.cartQuantity = 1;
        cart.push(action.product);
      }
      return {
        ...state,
        cart
      };
    }
    case UPDATE_QUANTITY:
      const updatedProducts = state.cart.map((product) =>
        product.id === action.product.id ? action.product : product
      );
      return { ...state, cart: updatedProducts };
    case DELETE_PRODUCT:
      const updatedCart = state.cart.filter((product) => product.id !== action.product.id);
      return { ...state, cart: updatedCart };
    case SUBMIT_ORDER:
      return { ...state, cart: [], form: {} };
    case LOGOUT:
      localStorage.setItem("characterSpotCart", JSON.stringify([]));
      return { ...state, cart: [] };
    case SET_CART_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    case STORE_CHECKOUT_INFO:
      return { ...state, form: action.formState };
    default:
      return state;
  }
};
