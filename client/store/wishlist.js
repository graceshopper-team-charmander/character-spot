import axios from "axios";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../constants";
import { SET_PRODUCTS_FETCH_STATUS } from "./products";

/*************************
 * Action Types          *
 ************************/
export const SET_WISHLIST_FETCH_STATUS = "SET_WISHLIST_FETCH_STATUS";
export const SET_WISHLIST = "SET_WISHLIST";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";

/*************************
 * Action Creators       *
 ************************/
//--Thunks--
export const fetchWishlist = (location) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchWishlistStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/users/wishlist`);
      dispatch(setWishlist(data));
      dispatch(setFetchWishlistStatus(FETCH_SUCCESS));
    } catch (err) {
      dispatch(setFetchWishlistStatus(FETCH_FAILED));
      console.log(err);
    }
  };
};

export const deleteFromWishlistThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/users/wishlist/${id}`);
      if (response.status === 200) {
        dispatch(deleteFromWishlist(id));
      }
      return response.status === 200;
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToWishlistThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/users/wishlist/${id}`);
      dispatch(addToWishlist(response.data));
      return response.status === 200;
    } catch (err) {
      console.log(err);
    }
  };
};

//--Plain actions--
export const setFetchWishlistStatus = (status) => {
  return {
    type: SET_WISHLIST_FETCH_STATUS,
    status
  };
};

export const setWishlist = (payload) => {
  return {
    type: SET_WISHLIST,
    payload
  };
};

export const addToWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    product
  };
};

export const deleteFromWishlist = (id) => {
  return {
    type: DELETE_FROM_WISHLIST,
    id
  };
};

/*************************
 * Reducer       *
 ************************/
const initialState = {
  fetchStatus: FETCH_PENDING,
  wishlist: [],
  totalItems: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHLIST:
      return { ...state, wishlist: [...action.payload] };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.product]
      };
    case DELETE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist.filter((item) => item.id !== action.id)]
      };
    case SET_WISHLIST_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    default:
      return state;
  }
};
