import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../constants";
import { setFetchProductsStatus } from "./products";

export const SET_ORDERS_FETCH_STATUS = "SET_ORDERS_FETCH_STATUS";
export const SET_ORDERS = "SET_ORDERS";

const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders
  };
};

export const setFetchOrdersStatus = (status) => {
  return {
    type: SET_ORDERS_FETCH_STATUS,
    status
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchOrdersStatus(FETCH_PENDING));
      const response = await axios.get("/api/orders");
      dispatch(setOrders(response.data));
      dispatch(setFetchOrdersStatus(FETCH_SUCCESS));
    } catch (err) {
      // console.log(err.status === 500 ? )
      dispatch(setFetchOrdersStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

let initialState = { fetchStatus: FETCH_PENDING, orders: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    case SET_ORDERS_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    default:
      return state;
  }
};
