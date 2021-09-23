import React, { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  }
});

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "coins",
      errors: {
        paymentMethod: ""
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
      <Paper elevation={1} className={muiClasses.paperRoot}>
        <div className="form-header orange">
          <div className="form-title">Shipping</div>
        </div>
        <div className="form-container">
          <FormControl variant="outlined" className={muiClasses.formControlRoot} margin="dense">
            <InputLabel id="payment_method">Payment Method</InputLabel>
            <Grid container spacing={1}>
              <Select
                labelId="payment_method"
                label="Payment Method"
                fullWidth
                value="chocoboExpress"
                name="paymentMethod"
                onChange={handleChange}>
                <MenuItem value="chocoboExpress">Chocobo Express</MenuItem>
                <MenuItem value="ups">UPS</MenuItem>
                <MenuItem value="usps">USPS</MenuItem>
              </Select>
            </Grid>
          </FormControl>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Address);
