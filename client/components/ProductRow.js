/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../store/cart";

const ProductRow = (props) => {
  const { product } = props;
  const { id, name, description, price, imageUrl } = product;

  const dispatch = useDispatch();

  const handleClick = (evt) => {
    const productId = evt.target.value;
    dispatch(addToCartThunk(productId));
  };
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 card p-4 m-2">
      <Link className="product-link" to={`/products/${id}`}>
        <h5 className="card-title">{name}</h5>
      </Link>
      <Link to={`/products/${id}`}>
        <img className="card-img" src={imageUrl} alt="Card image cap" />
      </Link>
      <div className="card-body">
        <p className="card-text">$ {price}</p>

        <button value={id} onClick={handleClick} className="btn btn-secondary add-to-cart">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
