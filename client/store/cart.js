import axios from "axios";
import { noExtendLeft } from "sequelize/types/lib/operators";

const ADD_TO_CART = "ADD_TO_CART"
const SET_CART = "SET_CART"
const UPDATE_QUANTITY = "UPDATE_QUANTITY"
const DELETE_PRODUCT = "DELETE_PRODUCT"


const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
}

export const fetchCart = (user) => {
  return  async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${user.id}/cart`)
      dispatch(setCart(data))
    } catch(err){
      console.log(err)
    }
  }
}

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const addToCartThunk = (user, product) => {
  return async(dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${user.id}/cart/${product.id}`)
      dispatch(addToCart(data))
    } catch(err){
      console.log(err)
    }
  }
}

const updateQuantity = (cart) => {
  return {
    type: UPDATE_QUANTITY,
    cart
  }
}

export const updateQuantityThunk = (user, product, quantity) => {
  return async(dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${user.id}/cart/${product.id}`)
      dispatch(updateQuantity(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

export const deleteProductThunk = (user, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/users/${user.id}/cart/${product.id}`)
      dispatch(deleteProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}
let initialState = []

export default (state = initialState, action) => {
  switch(action.type){
    case SET_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    case UPDATE_QUANTITY:
      return {...state, cart: action.cart}
    case DELETE_PRODUCT:
      const updatedCart = action.cart.filter( (product) => (product.id !== action.product.id))
      return {...state, cart: updatedCart}
    default:
      return state
  }
}
