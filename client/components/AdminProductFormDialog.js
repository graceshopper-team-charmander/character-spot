import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch } from "react-redux";
import { adminAddProductThunk, adminUpdateProductThunk } from "../store/admin";

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

const AdminProductFormDialog = (props) => {
  const muiClasses = useStyles();
  const {dialogMode} = props;
  const {
    product,
    dialogStatus,
    setDialogStatus,
    setSnackbarStatus,
    setSnackbarMessage,
    formName
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    setFormState({ ...formState, ...product });
  }, [product]);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    imageUrl: "",
    quantity: "",
    description: "",
    errors: {
      name: false,
      price: false,
      imageUrl: false,
      quantity: false,
      description: false
    }
  });

  useEffect(() => {
    let newState = { ...formState, ...product };
    setFormState(newState);
  }, [product]);

  const handleChange = (evt) => {
    const newState = { ...formState };
    newState[evt.target.name] = evt.target.value;
    setFormState(newState);
  };

  const handleClick = async (id, product) => {
    const thunk = dialogMode === 'edit' ? () => dispatch(adminUpdateProductThunk(product.id, formState)):
      () => dispatch(adminAddProductThunk(formState));
    const isSuccessful = await thunk();
    if (isSuccessful) {
      setSnackbarMessage("Success!");
    } else {
      setSnackbarMessage("Uh oh, there was an error!");
    }
    setSnackbarStatus(true);
    setDialogStatus(false);
  };

  if (!product) {
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
                label="Product Name"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.name}
                name="name"
                onChange={handleChange}
                error={!!formState.errors.name}
                helperText={formState.errors.name ? formState.errors.name : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Price"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.price / 100}
                name="price"
                onChange={(evt) =>
                  setFormState({...formState, price: evt.target.value * 100})}
                error={!!formState.errors.price}
                helperText={formState.errors.price ? formState.errors.price : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Quantity"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.quantity}
                name="quantity"
                onChange={handleChange}
                error={!!formState.errors.quantity}
                helperText={formState.errors.quantity ? formState.errors.quantity : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Image Url"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.imageUrl}
                name="imageUrl"
                onChange={handleChange}
                error={!!formState.errors.imageUrl}
                helperText={formState.errors.imageUrl ? formState.errors.imageUrl : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                variant="outlined"
                fullWidth
                multiline
                value={formState.description}
                name="description"
                onChange={handleChange}
                error={!!formState.errors.description}
                helperText={formState.errors.description ? formState.errors.description : false}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className="wishlist-buttons">
            <Button
              classes={{ root: muiClasses.addButton, label: muiClasses.buttonLabel }}
              onClick={() => handleClick(product.id, formState)}>
              {dialogMode === "edit" ? "Update" : "Add"}
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

export default AdminProductFormDialog;
