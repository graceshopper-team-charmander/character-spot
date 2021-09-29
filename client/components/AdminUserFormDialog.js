import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch } from "react-redux";
import { adminUpdateUserThunk } from "../store/admin";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  addButton: {
    backgroundColor: "#009edb",
    color: "white",
    fontStyle: "bold",
    "&:hover": {
      backgroundColor: "#fcd000"
    }
  },
  deleteButton: {
    backgroundColor: "#e71e07",
    color: "white",
    fontStyle: "bold",
    "&:hover": {
      backgroundColor: "#fcd000",
      color: "#e71e07"
    }
  },
  buttonLabel: {
    fontFamily: "mario"
  },
  formControlRoot: {
    width: "100%"
  }
}));

const AdminUserFormDialog = (props) => {
  const muiClasses = useStyles();
  const { user, dialogStatus, setDialogStatus, setSnackbarStatus, setSnackbarMessage, formName, } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    setFormState({ ...formState, ...user });
  }, [user]);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      isAdmin: false
    }
  });

  useEffect(() => {
    let newState = { ...formState, ...user };
    setFormState(newState);
  }, [user]);

  const handleChange = (evt) => {
    const newState = { ...formState };
    newState[evt.target.name] = evt.target.value;
    setFormState(newState);
  };

  const handleUpdate = async (id, user) => {
    const isUpdated = await dispatch(adminUpdateUserThunk(user.id, formState));
    if (isUpdated) {
      setSnackbarMessage("Successfully updated");
    } else {
      setSnackbarMessage("Uh oh, failed to update!");
    }
    setSnackbarStatus(true);
    setDialogStatus(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Dialog
        open={dialogStatus}
        onClose={() => setDialogStatus(false)}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{formName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Email Address"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.email}
                name="email"
                onChange={handleChange}
                error={!!formState.errors.email}
                helperText={formState.errors.email ? formState.errors.email : false}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label=""
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
            <FormControl variant="outlined" className={muiClasses.formControlRoot} margin="dense">
              <InputLabel id="is_admin">Admin Status</InputLabel>
              <Select
                labelId="is_admin"
                label="Admin Status"
                fullWidth
                value={formState.isAdmin}
                name="isAdmin"
                onChange={handleChange}
                error={!!formState.errors.isAdmin}
                helperText={formState.errors.isAdmin ? formState.errors.isAdmin : false}>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className="wishlist-buttons">
            <Button
              classes={{ root: muiClasses.addButton, label: muiClasses.buttonLabel }}
              onClick={() => handleUpdate(user.id, formState)}>
              Update
            </Button>
            <Button
              classes={{ root: muiClasses.deleteButton, label: muiClasses.buttonLabel }}
              onClick={() => setDialogStatus(false)}>
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminUserFormDialog;
