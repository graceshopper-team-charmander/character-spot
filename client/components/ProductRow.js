import React from "react";
import { Link } from "react-router-dom";

const ProductRow = (props) => {
  const { product } = props;
  const { id, name, description, price, imageUrl } = product;
  console.log(product);
  return (
    <div className="card col-2 m-3">
      <Link to={`/products/${id}`}>
        <img className="card-img-top" src={imageUrl} alt="Card image cap" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {/* <p className="card-text">{description}</p> */}
        <p className="card-text">$ {price}</p>

        <a href="#" className="btn btn-primary add-to-cart">
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
