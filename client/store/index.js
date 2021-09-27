import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./products";
import singleProduct from "./singleProduct";
import cart from "./cart";
import orders from "./orders";
import localCart from "./localCart";
import charge from "./charge";

const reducer = combineReducers({
  auth,
  products, //for all products
  singleProduct, //for single product
  cart,
  orders,
  charge,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
