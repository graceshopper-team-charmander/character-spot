import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../constants";

/*************************
 * Action Types          *
 ************************/
export const SET_PRODUCTS_FETCH_STATUS = "SET_PRODUCTS_FETCH_STATUS";
export const SET_PRODUCTS = "SET_PRODUCTS";

/*************************
 * Action Creators       *
 ************************/
//--Thunks--
export const fetchProducts = (location) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchProductsStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/products`);
      dispatch(setProducts(data));
      dispatch(setFetchProductsStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchProductsStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

//--Plain actions--
export const setFetchProductsStatus = (status) => {
  return {
    type: SET_PRODUCTS_FETCH_STATUS,
    status
  };
};

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

/*************************
 * Reducer       *
 ************************/
const initialState = {
  fetchStatus: FETCH_PENDING,
  students: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, ...action.payload };
    case SET_PRODUCTS_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    default:
      return state;
  }
};
