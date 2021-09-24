import axios from "axios";

const SET_ORDERS = "SET_ORDERS";

const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/orders");
      dispatch(setOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = { orders: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    default:
      return state;
  }
};
