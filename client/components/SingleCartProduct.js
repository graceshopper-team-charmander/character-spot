import React, { useState } from "react";
import { Card, CardHeader } from "@mui/material";

class SingleCartProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardHeader title={this.props.product.name} />
      </Card>
    );
  }
}

export default SingleCartProduct;
