import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = (loggedIn) => async (dispatch) => {
  console.log("MEE");
  // const token = document.cookie;
  //window.localStorage.getItem(TOKEN)
  // if (loggedIn) {
  //   const res = await axios.get("/auth/me", {
  //     headers: {
  //       authorization: token
  //     }
  //   });
  // return dispatch(setAuth(res.data));
  // }
};

export const authenticate = (username, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { username, password });
    // window.localStorage.setItem(TOKEN, res.data.token)
    // if (res.data.loggedIn) {
    //   dispatch(setLoggedIn())
    // } else {
    //   dispatch(setLoggedOut())
    // }
    console.log("AUTHRES", res.data);
    const user = res.data.user;
    // dispatch(me(loggedIn));
    dispatch(setAuth(user));
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => async (dispatch) => {
  // window.localStorage.removeItem(TOKEN)
  console.log("logout");
  const res = await axios.get(`/auth/logout`);
  console.log("PROMISE PENDING");
  history.push("/login");
  dispatch(setAuth({}));
  // return {
  //   type: SET_AUTH,
  //   auth: {}
  // };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
