import axios from "axios";
import history from "../history";
import { fetchCart, initCart, setCartThunk } from "./cart";
import { clearLocalCart, setLocalCart } from "./localCart";

/***********************
 * STATES        *
 ***********************/
export const LOGGED_IN = true;
export const NOT_LOGGED_IN = false;

/***********************
 * ACTION TYPES        *
 ***********************/
const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/***********************
 * ACTION CREATORS     *
 ***********************/
const setLoggedIn = (firstName) => ({ type: LOGIN, firstName });
const setLoggedOut = () => ({ type: LOGOUT });

/**
 * THUNK CREATORS
 */
export const authenticate = (method, credentials) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/auth/${method}`, credentials);
      if (response.data.loggedIn) {
        dispatch(setLoggedIn(response.data.firstName));
        if (localStorage.getItem("characterStopCart")) {
          //merge carts
          const state = getState();
          dispatch(setCartThunk(state.cart.cart));
        } else {
          dispatch(fetchCart());
        }
      } else {
        console.log("Failed to authenticate");
        //@todo failed to authenticate
      }
    } catch (err) {
      console.log(err);
    } finally {
      initCart(dispatch, getState());
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/auth/logout");
      if (!response.data.loggedIn) {
        dispatch(setLoggedOut());
      } else {
        console.log("Failed to logout");
        //@todo failed to logout
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const whoAmI = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/auth/whoAmI");
      if (response.data.loggedIn) {
        dispatch(setLoggedIn(response.data.firstName));
      } else {
        console.log("Failed to authenticate");
        //@todo failed to authenticate
      }
    } catch (err) {
      console.log(err);
    } finally {
      initCart(dispatch, getState());
    }
  };
};

/***********************
 * REDUCER             *
 ***********************/
const initialState = {
  firstName: "Guest",
  loggedIn: NOT_LOGGED_IN
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { loggedIn: LOGGED_IN, firstName: action.firstName };
    case LOGOUT:
      return { loggedIn: NOT_LOGGED_IN, firstName: "Guest" };
    default:
      return state;
  }
};
