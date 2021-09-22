import React from "react";
import { Link } from "react-router-dom";

const ProductRow = (props) => {
  const { product } = props;
  const { id, name, description, price, imageUrl } = product;
  console.log(product);
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 card p-4 m-2">
      <Link className="product-link" to={`/products/${id}`}>
        <h5 className="card-title">{name}</h5>
      </Link>
      <Link to={`/products/${id}`}>
        <img className="card-img" src={imageUrl} alt="Card image cap" />
      </Link>
      <div className="card-body">
        {/* <p className="card-text">{description}</p> */}
        <p className="card-text">$ {price}</p>

        <a href="#" className="btn btn-secondary add-to-cart">
          ADD TO CART
        </a>
      </div>
    </div>
  );

  // return (
  //   <Link to={`/products/${product.id}`}>
  //     <div>{product.name}</div>
  //   </Link>
  // );
};

export default ProductRow;
