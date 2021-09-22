/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-expand-lg px-3 shadow-sm navbar-light">
    {/* <div className="container-fluid"> */}

    <img
      className="navbar-brand"
      src="https://fontmeme.com/permalink/210922/7883c797940c9330ef88b87589f6212a.png"
    />

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
      <ul className="navbar-nav mr-auto">
        {isLoggedIn && (
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              <i className="fas fa-home m-1"></i>
              Home
            </Link>
          </li>
        )}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <i className="fas fa-gamepad m-1"></i>
            Products
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/products">
              All
            </Link>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              NFTs
            </a>
            <a className="dropdown-item" href="#">
              Collectibles
            </a>
          </div>
        </li>
      </ul>
      {isLoggedIn ? (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0  navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <i className="fas fa-shopping-cart m-1"></i>
              Cart
            </Link>
          </li>
          <a className="nav-link" href="#" onClick={handleClick}>
            <i className="fas fa-sign-out-alt m-1"></i>
            Logout
          </a>
        </ul>
      ) : (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0  navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <i className="fas fa-sign-in-alt m-1"></i>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              <i className="fas fa-user-plus m-1"></i>
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
    {/* </div> */}
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
