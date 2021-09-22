import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../constants";
import ProductRow from "./ProductRow";

const AllProducts = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const fetchStatus = useSelector((state) => state.products.fetchStatus);

  //on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (fetchStatus === FETCH_PENDING) return <div>Loading</div>;
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;
  return (
    <div>
      <div className="container my-4 ">
        <h3 className="display-6 d-flex justify-content-center">Products</h3>
      </div>

      <div className="card-deck">
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
