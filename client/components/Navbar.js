/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-expand-lg px-3 shadow-sm">
    <div className="container-fluid">
      <h1 className="navbar-brand">CHARM CHARACTER SHOP</h1>
      <div className="navbar" id="navbarSupportedContent">
        <form className="d-flex">
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-danger search" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                <i className="fas fa-home m-1"></i>
                Home
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link active" to="/products">
              <i className="fas fa-gamepad m-1"></i>
              Products
            </Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0  navbar-right">
            <a className="nav-link active" href="#" onClick={handleClick}>
              Logout
            </a>
          </ul>
        ) : (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0  navbar-right">
            <li className="nav-item">
              <Link className="nav-link active" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        )}

        {/* <nav>
          {isLoggedIn ? (
            <div>
              The navbar will show these links after you log in
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              The navbar will show these links before you log in
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav> */}
        <hr />
      </div>
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
