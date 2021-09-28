import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../constants";

/*************************
 * Action Types          *
 ************************/
export const SET_ADMIN_USERS_FETCH_STATUS = "SET_ADMIN_USERS_FETCH_STATUS";
export const SET_ADMIN_USERS = "SET_ADMIN_USERS";
export const SET_ADMIN_PRODUCTS_FETCH_STATUS = "SET_ADMIN_PRODUCTS_FETCH_STATUS";
export const SET_ADMIN_PRODUCTS = "SET_ADMIN_PRODUCTS";

/*************************
 * Action Creators       *
 ************************/
//--Plain actions--
export const setFetchAdminUsersStatus = (status) => {
  return {
    type: SET_ADMIN_USERS_FETCH_STATUS,
    status
  };
};

export const setFetchAdminProductsStatus = (status) => {
  return {
    type: SET_ADMIN_PRODUCTS_FETCH_STATUS,
    status
  };
};

export const setAdminUsers = (payload) => {
  return {
    type: SET_ADMIN_USERS,
    payload
  };
};

export const setAdminProducts = (payload) => {
  return {
    type: SET_ADMIN_PRODUCTS,
    payload
  };
};

//--Thunks--
export const fetchAdminUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchAdminUsersStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/admin/users`);
      dispatch(setAdminUsers(data));
      dispatch(setFetchAdminUsersStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchAdminUsersStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

export const fetchAdminProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchAdminProductsStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/admin/products`);
      dispatch(setAdminProducts(data));
      dispatch(setFetchAdminProductsStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchAdminProductsStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

/*************************
 * Reducer       *
 ************************/
const initialState = {
  users: [],
  products: [],
  fetchUsersStatus: FETCH_PENDING,
  fetchProductsStatus: FETCH_PENDING
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_USERS:
      return { ...state, users: action.payload };
    case SET_ADMIN_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_ADMIN_USERS_FETCH_STATUS:
      return { ...state, fetchUsersStatus: action.status };
    case SET_ADMIN_PRODUCTS_FETCH_STATUS:
      return { ...state, fetchProductsStatus: action.status };
    default:
      return state;
  }
};
