import React from "react";
import { connect } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { getInfo, updateInfoThunk } from "../store/auth";
import { Link } from "react-router-dom";

class EditPassword extends React.Component {
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
      Hello
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
export default connect(mapState,mapDispatch)(EditPassword);
