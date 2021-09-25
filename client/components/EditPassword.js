import React from "react";
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { changePasswordThunk } from "../store/auth";
import { Link } from "react-router-dom";

class EditPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentPassword: "",
      newPassword: "",
      errorText: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel= this.handleCancel.bind(this)
    this.onChangeOld = this.onChangeOld.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeConfirm = this.onChangeConfirm.bind(this)
  }

handleCancel (evt) {
  this.props.toggleEdit()
}

onChange(evt) {
  this.setState({...this.state, newPassword: evt.target.value})
}

onChangeOld(evt) {
  this.setState({...this.state, oldPassword: evt.target.value})
}

onChangeConfirm(evt) {
  this.setState({...this.state, errorText: this.state.newPassword !== evt.target.value})
}

handleSubmit (evt) {
  evt.preventDefault()
  this.props.changePassword({
    currentPassword: this.state.oldPassword,
    newPassword: this.state.newPassword
  })
  this.props.toggleEdit()
}
render() {
  return(
    <Box>
      <form onSubmit= {
        this.handleSubmit} name = "pw">
        <Card
        style = {{
          display: "flex",
          border: "8px solid #fcd000",
          margin: "10px",
          padding: "5px",
          borderRadius: "10px",
        }}>
        <Box style={{ flexGrow: 1, margin: 0 }}>
          <h1>Password </h1>
        </Box>
        <Box style = {{margin: 0}}>
          <Box><TextField
            id="outlined-size-small"
            size="small"
            name = "currentPassword"
            label = "Current Password"
            onChange = {this.onChangeOld}
          /> </Box>
          <Box><TextField
            id="outlined-size-small"
            size="small"
            name = "newPassword"
            label = "New Password"
            onChange = {this.onChange}
          /></Box>
          <Box><TextField
            id="outlined-size-small"
            size="small"
            name = "confirmNewPassword"
            label = "Confirm New Password"
            error = {this.state.errorText}
            helperText = {"Passwords must match"}
            onChange = {this.onChangeConfirm}
          /></Box>
        </Box>
        </Card>
        <Box style ={{display: "flex", justifyContent: "right"}}>
          <Button
            type = "submit"
            onClick = {this.handleSubmit}
            >Submit</Button>
          <Button
            onClick = {this.handleCancel}
            type = "button"
            >Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}
};

const mapState = (state) => {
  return {
    error: state.auth.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    changePassword: (pw) => dispatch(changePasswordThunk(pw)),
  }
}
export default connect(mapState,mapDispatch)(EditPassword);
