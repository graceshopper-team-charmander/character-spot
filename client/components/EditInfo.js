import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { getInfo, updateInfoThunk } from "../store/auth";
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
  submitButton: {
    margin: "10px",
    border: "3px solid #44af35"
  },
  cancelButton: {
    margin: "10px",
    border: "3px solid #e71e07"
  },
  textRoot: {
    outline: "2px solid #fcd000",
    border: "none",
    fontSize: "1rem",
    flexGrow: 1,
    padding: "2px",
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

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(evt) {
    this.props.toggleEdit();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateInfo({
      firstName: evt.target[0].value,
      lastName: evt.target[1].value,
      email: evt.target[2].value
    });
    this.props.toggleEdit();
  }
  render() {
    const muiClasses = this.props.classes;
    let user = this.props.user.user;
    return (
      <Box>
        <form onSubmit={this.handleSubmit} name="info">
          <Card classes={{ root: muiClasses.cardRoot }}>
            <Box style={{ flexGrow: 1, margin: 0 }}>
              <h1 style={{ fontFamily: "mario" }}>Name </h1>
              <Box style={{ margin: 0, display: "flex", flexDirection: "column" }}>
                <Box classes={{ root: muiClasses.boxRoot }}>
                  <Typography classes={{ root: muiClasses.fieldName }}>First Name</Typography>
                  <TextField
                    size="small"
                    name="firstName"
                    defaultValue={user ? user.firstName : ""}
                    inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
                    InputProps={{ disableUnderline: true }}
                    classes={{ root: muiClasses.textRoot }}
                  />
                </Box>
                <Box classes={{ root: muiClasses.boxRoot }}>
                  <Typography classes={{ root: muiClasses.fieldName }}>Last Name: </Typography>
                  <TextField
                    size="small"
                    name="lastName"
                    defaultValue={user ? user.lastName : ""}
                    inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
                    InputProps={{ disableUnderline: true }}
                    classes={{ root: muiClasses.textRoot }}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
          <Card
            classes={{ root: muiClasses.cardRoot }}
          >
            <Box style={{ flexGrow: 1, margin: 0 }}>
              <h1 style={{ fontFamily: "mario" }}>Email </h1>
              <Box style={{ display: "flex", margin: 0, flexDirection: "column" }}>
                <Box classes={{ root: muiClasses.boxRoot }}>
                  <Typography classes={{ root: muiClasses.fieldName }}>Email</Typography>
                  <TextField
                    size="small"
                    name="email"
                    classes={{ root: muiClasses.textRoot }}
                    inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
                    InputProps={{ disableUnderline: true }}
                    defaultValue={user ? user.email : ""}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
          <Box style={{ display: "flex", justifyContent: "right" }}>
            <Button  classes={{ root: muiClasses.submitButton }} onSubmit={this.handleSubmit} type="submit">
            <h3 style = {{fontFamily: "mario"}}>Submit</h3>
            </Button>
            <Button classes={{ root: muiClasses.cancelButton }} onClick={this.handleCancel} type="button">
            <h3 style = {{fontFamily: "mario"}}>Cancel</h3>
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.auth.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateInfo: (info) => dispatch(updateInfoThunk(info)),
    getInfo: () => dispatch(getInfo())
  };
};
export default connect(mapState, mapDispatch)(withStyles(styles)(EditInfo));
