import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../constants";

/*************************
 * Action Types          *
 ************************/
export const SET_PRODUCTS_FETCH_STATUS = "SET_PRODUCTS_FETCH_STATUS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_PRODUCT_CATEGORIES = "SET_PRODUCT_CATEGORIES";

/*************************
 * Action Creators       *
 ************************/
//--Thunks--
export const fetchProducts = (location) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchProductsStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/products${location ? location.search : ""}`);
      dispatch(setProducts(data));
      dispatch(setFetchProductsStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchProductsStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

export const fetchProductCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      dispatch(setProductCategories(data));
    } catch (err) {
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

const setProductCategories = (categories) => {
  return {
    type: SET_PRODUCT_CATEGORIES,
    categories
  };
};

/*************************
 * Reducer       *
 ************************/
const initialState = {
  fetchStatus: FETCH_PENDING,
  products: [],
  productCategories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: [...action.products] };
    case SET_PRODUCT_CATEGORIES:
      return { ...state, productCategories: action.categories };
    case SET_PRODUCTS_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };

    default:
      return state;
  }
};
