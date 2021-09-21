import React from "react";
import { Link } from "react-router-dom";

const ProductRow = (props) => {
  const { product } = props;
  return (
    <Link to={`/products/${product.id}`}>
      <div>{product.name}</div>
    </Link>
  );
};

export default ProductRow;
