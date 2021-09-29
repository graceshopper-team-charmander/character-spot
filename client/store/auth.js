import { responsiveFontSizes } from "@material-ui/core";
import axios from "axios";
import { database } from "faker";
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
const SET_INFO = "GET_INFO";
const UPDATE_INFO = "UPDATE_INFO";
const CHANGE_PW = "CHANGE_PW";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const SET_ADMIN_STATUS = "SET_ADMIN_STATUS";

/***********************
 * ACTION CREATORS     *
 ***********************/
const setLoggedIn = (firstName, lastName, email) => ({ type: LOGIN, firstName, lastName, email });
const setLoggedOut = () => ({ type: LOGOUT, firstName: 'Guest' });
const setInfo = ({ firstName, lastName, email }) => ({
  type: SET_INFO,
  payload: { firstName, lastName, email }
});
const updateInfo = ({ firstName, lastName, email }) => ({
  type: UPDATE_INFO,
  payload: { firstName, lastName, email }
});
const changePassword = () => ({ type: CHANGE_PW });
const setAdminStatus = (status) => ({ type: SET_ADMIN_STATUS, status });
export const loginSuccess = (bool) => ({ type: LOGIN_SUCCESS, bool });

/**
 * THUNK CREATORS
 */
export const authenticate = (method, credentials) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/auth/${method}`, credentials);
      if (response.data.loggedIn) {
        dispatch(loginSuccess(true));
        dispatch(setLoggedIn(response.data.firstName, response.data.lastName, response.data.email));
        dispatch(setAdminStatus(response.data.isAdmin));
        return true;
      } else {
        console.log("Failed to authenticate");
        dispatch(loginSuccess(false));
        //@todo failed to authenticate
        return false;
      }
    } catch (err) {
      // alert("Email/Password Incorrect")
      dispatch(loginSuccess(false));
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
        dispatch(loginSuccess(false));
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
      console.log("*****", response);
      if (response.data.loggedIn) {
        // @todo cleanup
        dispatch(setLoggedIn(response.data.firstName, response.data.lastName, response.data.email));
        dispatch(setAdminStatus(response.data.isAdmin));
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

export const getInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/info");
      dispatch(setInfo(data.user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateInfoThunk = (update) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/auth/update", update);
      if (data) {
        console.log("updateInfo", data);
        dispatch(updateInfo(data.user));
        // dispatch(setLoggedIn(data.firstName, data.lastName, data.email));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const changePasswordThunk = (pw) => {
  return async (dispatch) => {
    try {
      //test to see if old password is correct
      //if so, update the new password
      //otherwise return an error
      const response = await axios.post("/auth/change", pw);
      if (response.status == 204) {
        alert("Current password is incorrect");
      } else {
        alert("Password changed");
        dispatch(changePassword());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/***********************
 * REDUCER             *
 ***********************/
const initialState = {
  firstName: "Guest",
  lastName: "",
  email: "",
  loggedIn: NOT_LOGGED_IN,
  loginSuccess: true,
  error: false,
  adminStatus: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: LOGGED_IN,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email
      };
    case LOGOUT:
      return { ...state, loggedIn: NOT_LOGGED_IN, firstName: "Guest", lastName: "", email: "" };
    case SET_INFO:
      return { ...state, ...action.payload };
    case UPDATE_INFO:
      return { ...state, ...action.payload };
    case CHANGE_PW:
      return { ...state };
    case LOGIN_SUCCESS:
      console.log("REDUCER", action.bool);
      return { ...state, loginSuccess: action.bool };
    case SET_ADMIN_STATUS:
      return { ...state, adminStatus: action.status };
    default:
      return state;
  }
};
