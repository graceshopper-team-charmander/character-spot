import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }
});

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressName: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
      errors: {
        addressName: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zipCode: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    const muiClasses = this.props.classes;
    const { handleChange } = this;
    return (
      <Grid item xs={12}>
        <Paper elevation={1} className={muiClasses.paperRoot}>
          <div className="form-header orange">
            <div className="form-title">Shipping</div>
          </div>
          <div className="form-container">
            <Grid container spacing={1}></Grid>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Address);
