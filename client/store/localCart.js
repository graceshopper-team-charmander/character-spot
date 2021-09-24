import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const SUBMIT_ORDER = "SUBMIT_ORDER"

const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  };
};

export const fetchLocalCart = () => {
  //load cart from localStorage
};

export const addToLocalCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  };
};

const updateLocalCartQuantity = (product) => {
  return {
    type: UPDATE_QUANTITY,
    product
  };
};


const deleteLocalCartProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  };
};


const submitGuestOrder = (cart) => {
  return {
    type: SUBMIT_ORDER,
    cart
  }
}

export const submitGuestOrderThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/guest-checkout`);
      dispatch(submitGuestOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};


let initialState = { cart: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.cart };
    case ADD_TO_CART:
      return { ...state, cart: action.cart };
    case UPDATE_QUANTITY:
      const updatedProducts = state.cart.map( (product) => {
        if(product.id === action.product.id) {
          return action.product
        } else {
          return product
        }
      })
      return { ...state, cart: updatedProducts};
    case DELETE_PRODUCT:
      const updatedCart = state.cart.filter((product) => product.id !== action.product.id);
      return { ...state, cart: updatedCart };
    case SUBMIT_ORDER:
      return {...state, cart: []}
    default:
      return state;
  }
};
