/* eslint-disable react/prop-types */
import React, { Component, Fragment, useEffect } from "react";
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
import Thankyou from "./components/Thankyou";
import NotFound from "./components/NotFound";
import PayByStripe from "./components/PayByStripe";
import Admin from "./components/Admin";
import Wishlist from "./components/Wishlist";
import { fetchWishlist } from "./store/wishlist";
import { NoEncryption } from "@material-ui/icons";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    //save the users cart if they reload or navigate away
    addEventListener("beforeunload", () => {
      if (!this.props.isLoggedIn) {
        saveLocalCartOnUnload(this.props.cart);
      }
    });
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
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
          <Route path="/wishlist">
            <Wishlist />
          </Route>
          <Route path="/thankyou">
            <Thankyou />
          </Route>
          <Route path="/payment">
            <PayByStripe />
          </Route>
          <Route path="/admin">{isLoggedIn && isAdmin ? <Admin /> : <NotFound />}</Route>
          {!isLoggedIn && (
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          )}
          <Route path="*">
            <NotFound />
          </Route>
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
    cart: state.cart.cart,
    isAdmin: state.auth.adminStatus
  };
};

const mapDispatch = (dispatch) => {
  return {
    async loadInitialData() {
      dispatch(fetchProductCategories());
      await dispatch(whoAmI());
      dispatch(fetchWishlist());
    },
    setCartThunk(cart) {
      dispatch(setCartThunk(cart));
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
