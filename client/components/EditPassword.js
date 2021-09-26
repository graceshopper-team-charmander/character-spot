import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { changePasswordThunk } from "../store/auth";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  cardRoot: {
    display: "flex",
    border: "8px solid #fcd000",
    margin: "10px",
    padding: "5px",
    borderRadius: "10px"
  },
  textRoot: {
    outline: "2px solid #fcd000",
    fontSize: "1rem",
    flexGrow: 1,
    padding: "2px",
  },
  submitButton: {
    margin: "10px",
    border: "3px solid #44af35"
  },
  cancelButton: {
    margin: "10px",
    border: "3px solid #e71e07"
  },
  boxRoot: {
    flexDirection: "row",
    marginTop: "5px",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center"
  },
  fieldName: {
    minWidth: "13rem",
    fontFamily: "mario"
  },
  text: {
    fontFamily: "mario"
  }
});

class EditPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      errorText: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onChangeOld = this.onChangeOld.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeConfirm = this.onChangeConfirm.bind(this);
  }

  handleCancel(evt) {
    this.props.toggleEdit();
  }

  onChange(evt) {
    this.setState({ ...this.state, newPassword: evt.target.value });
  }

  onChangeOld(evt) {
    this.setState({ ...this.state, oldPassword: evt.target.value });
  }

  onChangeConfirm(evt) {
    this.setState({ ...this.state, errorText: this.state.newPassword !== evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.changePassword({
      currentPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    });
    this.props.toggleEdit();
  }
  render() {
    const muiClasses = this.props.classes;
    return (
      <Box>
        <form onSubmit={this.handleSubmit} name="pw">
          <Card classes={{ root: muiClasses.cardRoot }}>
            <Box style={{ flexGrow: 1, margin: 0 }}>
              <h1 style={{ fontFamily: "mario" }}>Password </h1>
              <Box style={{ display: "flex", margin: 0, flexDirection: "column" }}>
                <Box classes={{ root: muiClasses.boxRoot }}>
                  <Typography classes={{ root: muiClasses.fieldName }}>
                    Current Password:{" "}
                  </Typography>
                  <TextField
                    size="small"
                    type="password"
                    name="currentPassword"
                    classes={{ root: muiClasses.textRoot }}
                    inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
                    InputProps={{ disableUnderline: true }}
                    onChange={this.onChangeOld}
                  />
                </Box>
                <Box classes={{ root: muiClasses.boxRoot }}>
                  <Typography classes={{ root: muiClasses.fieldName }}>New Password: </Typography>
                  <TextField
                    size="small"
                    type="password"
                    name="newPassword"
                    classes={{ root: muiClasses.textRoot }}
                    inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
                    InputProps={{ disableUnderline: true }}
                    onChange={this.onChange}
                  />
                </Box>
                <Box classes={{ root: muiClasses.boxRoot }}>
                  <Typography classes={{ root: muiClasses.fieldName }}>
                    Confirm New Password:{" "}
                  </Typography>
                  <TextField
                    size="small"
                    type="password"
                    name="confirmNewPassword"
                    error={this.state.errorText}
                    helperText={"Passwords must match"}
                    classes={{ root: muiClasses.textRoot }}
                    inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
                    InputProps={{ disableUnderline: true }}
                    onChange={this.onChangeConfirm}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
          <Box style={{ display: "flex", justifyContent: "right" }}>
            <Button type="submit"  classes={{ root: muiClasses.submitButton }}  onClick={this.handleSubmit}>
              <h3 style={{ fontFamily: "mario" }}>Submit</h3>
            </Button>
            <Button onClick={this.handleCancel}  classes={{ root: muiClasses.cancelButton }} type="button">
              <h3 style={{ fontFamily: "mario" }}>Cancel</h3>
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    error: state.auth.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    changePassword: (pw) => dispatch(changePasswordThunk(pw))
  };
};
export default connect(mapState, mapDispatch)(withStyles(styles)(EditPassword));
