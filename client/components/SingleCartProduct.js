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
    console.log(this.props)
    return (
      <Card>
        <CardHeader
        title = "Hello"/>
      </Card>
    )
  }
}

export default SingleCartProduct;

