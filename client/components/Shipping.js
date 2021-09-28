import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  },
  text: {
    fontFamily :"mario"
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
          <div className="form-title"><h3 className = {muiClasses.text}>Shipping </h3></div>
        </div>
        <div className="form-container">
          <FormControl variant="outlined" className={muiClasses.formControlRoot} margin="dense">
            <InputLabel id="payment_method">Shipping Method</InputLabel>
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
