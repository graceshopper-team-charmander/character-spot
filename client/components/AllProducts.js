import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../constants";
import ProductRow from "./ProductRow";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  }
}));

const AllProducts = (props) => {
  const styles = useStyles();
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
    <Grid item xs={12} className="page">
      <Paper elevation={1} className={styles.paperRoot}>
        <div className="all-products-header">
          <h4 className="all-products-title">Products</h4>
        </div>

        <Grid item xs={12} className="all-products-container">
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default AllProducts;

{
  /* <div className="container-fluid m-4 px-4 py-4 bg-secondary">
<div className="row">
  <h4 className="col-1 d-flex m-2">Products</h4>
</div>

<div className="row">
  {products.map((product) => (
    <ProductRow key={product.id} product={product} />
  ))}
</div>
</div> */
}
