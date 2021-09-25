import React from "react";
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { getInfo, updateInfoThunk } from "../store/auth";
import { Link } from "react-router-dom";

class EditInfo extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel= this.handleCancel.bind(this)
  }

handleCancel (evt) {
  this.props.toggleEdit()
}

handleSubmit (evt) {
  evt.preventDefault()
  this.props.updateInfo({
    firstName: evt.target[0].value,
    lastName: evt.target[1].value,
    email: evt.target[2].value
  })
  this.props.toggleEdit()
}
render() {
  let user = this.props.user.user
  return(
    <Box>
      <form onSubmit= {
        this.handleSubmit} name = "info">
        <Card
          style = {{
            display: "flex",
            border: "8px solid #fcd000",
            margin: "10px",
            padding: "5px",
            borderRadius: "10px",
          }}>
          <Box style={{ flexGrow: 1, margin: 0 }}>
            <h1>Name </h1>
          </Box>
          <Box style = {{margin: 0}}>
          <TextField
            id="outlined-size-small"
            size="small"
            name = "firstName"
            label = "First Name"
            defaultValue = {(user) ? user.firstName : ""}
          />
          <TextField
            id="outlined-size-small"
            size="small"
            name = "lastName"
            label = "Last Name"
            defaultValue = { (user) ? user.lastName : "" }
           />
          </Box>
        </Card>
        <Card
          style = {{
            display: "flex",
            border: "8px solid #fcd000",
            margin: "10px",
            padding: "5px",
            borderRadius: "10px",
          }}>
          <Box style={{ flexGrow: 1, margin: 0}}>
            <h1 >Email </h1>
          </Box>
          <Box style = {{margin: 0}}>
          <TextField
            id="outlined-size-small"
            size="small"
            name = "email"
            label = "Email"
            defaultValue = {(user) ? user.email : ""}
          />
          </Box>
        </Card>
        <Box style ={{display: "flex", justifyContent: "right"}}>
          <Button
            onSubmit = {this.handleSubmit}
            type = "submit"
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
    user: state.auth.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateInfo: (info) => dispatch(updateInfoThunk(info)),
    getInfo: () => dispatch(getInfo())
  }
}
export default connect(mapState,mapDispatch)(EditInfo);
