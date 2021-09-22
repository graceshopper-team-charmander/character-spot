import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

class SingleCartProduct extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Card>
        <CardHeader
        title = {this.props.product.name}/>
      </Card>
    )
  }
}

export default SingleCartProduct;

