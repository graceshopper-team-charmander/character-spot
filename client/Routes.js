/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { whoAmI } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { fetchProductCategories } from "./store/products";
import Orders from "./components/Orders";
import { clearLocalCart, saveLocalCartOnUnload, setLocalCart } from "./store/localCart";
import { fetchCart, setCartThunk } from "./store/cart";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    addEventListener("beforeunload", () => {
      if (!this.props.isLoggedIn) {
        console.log("*********SAVE**********");
        saveLocalCartOnUnload(this.props.cart);
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //user went from not logged in -> logged in
    // if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
    //   //update the backend cart
    //   //clear local storage to default state
    //   this.props.setCartThunk(this.props.cart);
    //   console.log("setting cart");
    // } else if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
    //   clearLocalCart();
    // }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <AllProducts />
          </Route>
          <Route path="/products/:id">
            <SingleProduct />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>

          {isLoggedIn ? (
            <Switch>
              <Redirect path="/" />
              {/* <Route component={NotFound} /> */}
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route component={NotFound} />
            </Switch>
          )}
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: state.auth.loggedIn,
    cart: state.cart.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    async loadInitialData() {
      dispatch(fetchProductCategories());
      await dispatch(whoAmI());
    },
    setCartThunk(cart) {
      dispatch(setCartThunk(cart));
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
