/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  text: {
    fontFamily: "mario"
  }
}));

const GuestCheckoutForm = (props) => {
  const muiClasses = useStyles();
  const { formState, setFormState } = props;

  const handleChange = (evt) => {
    const newState = { ...formState };
    newState[evt.target.name] = evt.target.value;
    setFormState(newState);
  };

  return (
    <Paper elevation={1} className={muiClasses.paperRoot}>
      <div className="form-header">
        <div className="form-title"><h3 className = {muiClasses.text}>Details </h3></div>
      </div>
      <div className="form-container">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Email Address"
              type="text"
              variant="outlined"
              fullWidth
              value={formState.guestEmailAddress}
              name="guestEmailAddress"
              onChange={handleChange}
              error={!!formState.errors.guestEmailAddress}
              helperText={formState.errors.guestEmailAddress ? formState.errors.guestEmailAddress : false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="First Name"
              type="text"
              variant="outlined"
              fullWidth
              value={formState.firstName}
              name="firstName"
              onChange={handleChange}
              error={!!formState.errors.firstName}
              helperText={formState.errors.firstName ? formState.errors.firstName : false}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              variant="outlined"
              fullWidth
              value={formState.lastName}
              name="lastName"
              onChange={handleChange}
              error={!!formState.errors.lastName}
              helperText={formState.errors.lastName ? formState.errors.lastName : false}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default GuestCheckoutForm;
