/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;

  return (
    <div>
      <h3 className="home-header">Welcome, {firstName}</h3>
    </div>
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
