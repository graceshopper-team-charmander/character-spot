import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import ProductRow from "./ProductRow";
import { useHistory, useLocation } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import LoadingBar from "./LoadingBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Sort from "./Sort";
import Pagination from "./Pagination";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";

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
  const location = useLocation();
  const history = useHistory();
  const totalItems = useSelector(state => state.products.totalItems);
  //on mount
  useEffect(() => {
    const page = getQueryParam(location, 'page');
    if (!page) {
      const query = setQueryParam(location, 'page', 1);
      history.replace(`${location.pathname}?${query}`);
    }
    else {
      dispatch(fetchProducts(location));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(location));
  }, [location.search]);


  if (fetchStatus === FETCH_PENDING)
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  else if (fetchStatus === FETCH_FAILED) return <div>Error!</div>;

  return (
    <div className="all-products-page">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <Paper elevation={1} className={styles.paperRoot}> */}
          <div className="all-products-header">
            <Sort />
            <Pagination totalItems={totalItems}/>
            <h4 className="all-products-title">Characters</h4>
            <CategoryFilter location={location} history={history} />
          </div>

          <Grid item xs={12} className="all-products-container">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </Grid>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default AllProducts;
