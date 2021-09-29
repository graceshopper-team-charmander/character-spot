/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import HomeCarousel from "./HomeCarousel";
import HomeFeaturedProducts from "./HomeFeaturedProducts";
import HomeCreators from "./HomeCreators";
import Grid from "@material-ui/core/Grid";
import { fetchProducts } from "../store/products";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Grid container direction="column">
      {/* <h3 className="home-header">Welcome, {firstName}</h3> */}
      <HomeCarousel />

      <HomeFeaturedProducts />

      <HomeCreators />
    </Grid>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName
  };
};

export default connect(mapState)(Home);
