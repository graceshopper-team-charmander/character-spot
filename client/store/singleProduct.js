//Single Product

import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../constants";

/*************************
 * Action Types          *
 ************************/
export const SET_SINGLE_PRODUCT_FETCH_STATUS = "SET_SINGLE_PRODUCT_FETCH_STATUS";
export const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

/*************************
 * Action Creators       *
 ************************/
//--Thunks--
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchSingleProductStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(data));
      dispatch(setFetchSingleProductStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchSingleProductStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

//--Plain actions--
export const setFetchSingleProductStatus = (status) => {
  return {
    type: SET_SINGLE_PRODUCT_FETCH_STATUS,
    status
  };
};

export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  };
};

/*************************
 * Reducer       *
 ************************/
const initialState = {
  fetchStatus: FETCH_PENDING,
  product: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return { ...state, product: action.product };
    case SET_SINGLE_PRODUCT_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    default:
      return state;
  }
};
