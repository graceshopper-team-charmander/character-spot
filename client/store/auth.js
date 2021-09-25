import axios from "axios";
import { database } from "faker";
import history from "../history";

/***********************
 * STATES        *
 ***********************/
export const LOGGED_IN = true;
export const NOT_LOGGED_IN = false;

/***********************
 * ACTION TYPES        *
 ***********************/
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_INFO = "GET_INFO"
const UPDATE_INFO = "UPDATE_INFO"
const CHANGE_PW = "CHANGE_PW"

/***********************
 * ACTION CREATORS     *
 ***********************/
const setLoggedIn = (firstName) => ({ type: LOGIN, firstName });
const setLoggedOut = () => ({ type: LOGOUT });
const setInfo = (user) => ({type: SET_INFO, user})
const updateInfo = (user) => ({type: UPDATE_INFO, user})
const changePassword = (user) => ({type: CHANGE_PW, user})

/**
 * THUNK CREATORS
 */
export const authenticate = (method, credentials) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/auth/${method}`, credentials);
      if (response.data.loggedIn) {
        dispatch(setLoggedIn(response.data.firstName));
      } else {
        console.log("Failed to authenticate");
        //@todo failed to authenticate
      }
    } catch (err) {
      console.log(err);
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
    }
  };
};

export const getInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/info");
      dispatch(setInfo(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateInfoThunk = (update) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/auth/update", update);
      if(data) {
        alert("Info changed")
        dispatch(updateInfo(data));
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
      const response = await axios.post("/auth/change", pw)
      if(response.status == 204){
        alert("Current password is incorrect")
      } else {
        alert("Password changed")
        dispatch(changePassword(response.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}
/***********************
 * REDUCER             *
 ***********************/
const initialState = {
  firstName: "Guest",
  loggedIn: NOT_LOGGED_IN,
  user: {},
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: LOGGED_IN, firstName: action.firstName };
    case LOGOUT:
     return { ...state, loggedIn: NOT_LOGGED_IN, firstName: "Guest" };
    case SET_INFO:
      return {...state, user: action.user};
    case UPDATE_INFO:
      return {...state, user: action.user};
    case CHANGE_PW:
      return {...state}
    default:
      return state;
  }
};
