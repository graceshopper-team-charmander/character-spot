import React from "react";
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { getInfo, updateInfoThunk } from "../store/auth";

class EditInfo extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    <div>
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
          <div>
          <input
            name = "firstName"
            defaultValue = {(user) ? user.firstName : ""}
          />
          <input
            name = "lastName"
            defaultValue = { (user) ? user.lastName : "" }
           />
          </div>
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
            <h1>Email </h1>
          </Box>
          <div>
          <input name = "email"
            defaultValue = {(user) ? user.email : ""}
          />
          </div>
        </Card>
        <Button onSubmit = {this.handleSubmit} type = "submit" >Submit</Button>
      </form>

  </div>
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
