import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = (theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: '100%',
  },
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
          <div className="form-header red">
            <div className="form-title ">Payment Method</div>
          </div>
          <div className="form-container">
            <FormControl variant='outlined' className={muiClasses.formControlRoot} margin='dense'>
              <InputLabel id='payment_method'>Payment Method</InputLabel>
            <Grid container spacing={1}>
              <Select
                labelId="payment_method"
                label="Paymemt Method"
                fullWidth
                value="pokeDollars"
                name="payment_method"
                onChange={handleChange}>
                <MenuItem value="coins">Coins</MenuItem>
                <MenuItem value="gil">Gil</MenuItem>
                <MenuItem value="pokeDollars">PokeDollars</MenuItem>
                <MenuItem value="bells">Bells</MenuItem>
                <MenuItem value="dollars">Dollars</MenuItem>
                <MenuItem value="rupees">Rupees</MenuItem>
                <MenuItem value="paypal">Paypal</MenuItem>
                <MenuItem value="bitcoin">Bitcoin</MenuItem>
                <MenuItem value="eth">Etherium</MenuItem>
              </Select>
            </Grid>
            </FormControl>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Address);
