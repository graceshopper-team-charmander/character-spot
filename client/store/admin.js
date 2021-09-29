import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../constants";

/*************************
 * Action Types          *
 ************************/
export const SET_ADMIN_USERS_FETCH_STATUS = "SET_ADMIN_USERS_FETCH_STATUS";
export const SET_ADMIN_USERS = "SET_ADMIN_USERS";
export const SET_ADMIN_PRODUCTS_FETCH_STATUS = "SET_ADMIN_PRODUCTS_FETCH_STATUS";
export const SET_ADMIN_PRODUCTS = "SET_ADMIN_PRODUCTS";
const ADMIN_UPDATE_USER = "ADMIN_UPDATE_USER";
const ADMIN_UPDATE_PRODUCT = "ADMIN_UPDATE_PRODUCT";
const ADMIN_ADD_PRODUCT = "ADMIN_ADD_PRODUCT";
const ADMIN_DELETE_PRODUCT = "ADMIN_DELETE_PRODUCT";

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

const adminUpdateUser = (user) => {
  return {
    type: ADMIN_UPDATE_USER,
    user
  };
};

const adminUpdateProduct = (product) => {
  return {
    type: ADMIN_UPDATE_PRODUCT,
    product
  };
};

const adminAddProduct = (product) => {
  return {
    type: ADMIN_ADD_PRODUCT,
    product
  };
};

const adminDeleteProduct = (id) => {
  return {
    type: ADMIN_DELETE_PRODUCT,
    id
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

export const fetchAdminProducts = (location) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchAdminProductsStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/products${location ? location.search : ""}`);
      dispatch(setAdminProducts(data));
      dispatch(setFetchAdminProductsStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchAdminProductsStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

export const adminUpdateUserThunk = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/admin/users/${id}`, data);
      dispatch(adminUpdateUser(response.data));
      return true;
    } catch (err) {
      return false;
      console.log(err);
    }
  };
};

export const adminUpdateProductThunk = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/admin/products/${id}`, data);
      dispatch(adminUpdateProduct(response.data));
      return true;
    } catch (err) {
      return false;
      console.log(err);
    }
  };
};

export const adminAddProductThunk = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/admin/products`, data);
      dispatch(adminAddProduct(response.data));
      return true;
    } catch (err) {
      return false;
      console.log(err);
    }
  };
};

export const adminDeleteProductThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/admin/products/${id}`);
      if(response.status === 200) {
        dispatch(adminDeleteProduct(id));
        return true;
      }
      return true;
    } catch (err) {
      return false;
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
  fetchProductsStatus: FETCH_PENDING,
  totalUsers: 0,
  totalProducts: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_USERS:
      return { ...state, ...action.payload };
    case SET_ADMIN_PRODUCTS:
      return { ...state, ...action.payload };
    case SET_ADMIN_USERS_FETCH_STATUS:
      return { ...state, fetchUsersStatus: action.status };
    case SET_ADMIN_PRODUCTS_FETCH_STATUS:
      return { ...state, fetchProductsStatus: action.status };
    case ADMIN_UPDATE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== action.user.id), action.user]
      };
    case ADMIN_UPDATE_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products.filter((product) => product.id !== action.product.id),
          action.product
        ]
      };
    case ADMIN_DELETE_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products.filter((product) => product.id !== action.id),
        ]
      };
    default:
      return state;
  }
};
