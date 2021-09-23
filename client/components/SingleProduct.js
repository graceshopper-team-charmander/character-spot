import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../constants";
import { fetchSingleProduct } from "../store/singleProduct";
import { useParams } from "react-router-dom";

const SingleProducts = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct.product);
  const fetchStatus = useSelector((state) => state.singleProduct.fetchStatus);

  //on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id]);

  if (fetchStatus === FETCH_PENDING) return <div>Loading</div>;
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;
  return (
    <div>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.price/100}</div>
      <div>{product.imageUrl}</div>
      <div>{product.description}</div>
    </div>
  );
};

export default SingleProducts;
