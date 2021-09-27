import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { authenticate } from "../store";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error } = props;
  const [email, setEmail] = useState("cody@charm.com");
  const [password, setPassword] = useState("123");
  const [firstName, setFirstName] = useState("Cody");
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name === "signup") {
      dispatch(authenticate(name, { email, password, firstName }));
    } else {
      dispatch(authenticate(name, { email, password }));
    }
  };

  return (
    <Grid item xs={12} style ={{paddingTop: "1rem",
      /* width: 80%; */
      margin: "0 auto"}}>
    <div className="cart-header">
      <h4 className="cart-title">{(name === "signup") ? "Sign Up" : "Login"}</h4>
    </div>
    <Box style = {{margin: 25}}>
      <form onSubmit={handleSubmit} name={name}>
        <Card style = {{
          display: "flex",
          border: "8px solid #fcd000",
          margin: "10px",
          padding: "5px",
          borderRadius: "10px",
        }}>
          <Box style = {{margin:0, minWidth: "13rem"}} htmlFor="Email">
            <h1 style = {{fontFamily: "mario"}}>Email</h1>
          </Box>
          <TextField
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
            name="email"
            type="text"
            inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
            style = {{flexGrow: 1}}
            InputProps={{ disableUnderline: true }}
          />
        </Card>
        <Card style = {{
          display: "flex",
          border: "8px solid #fcd000",
          margin: "10px",
          padding: "5px",
          borderRadius: "10px"
        }}>
          <Box style = {{margin:0, minWidth: "13rem"}} htmlFor="password">
          <h1 style = {{fontFamily: "mario"}}>Password</h1>
          </Box>
          <TextField
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
            inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
            InputProps={{ disableUnderline: true }}
            style = {{flexGrow: 1}}
            name="password"
            type="password"
          />
        </Card>
        {name === "signup" && (
          <Card style = {{
            display: "flex",
            border: "8px solid #fcd000",
            margin: "10px",
            padding: "5px",
            borderRadius: "10px"
          }}>
            <Box htmlFor="First Name">
            <h1 style = {{fontFamily: "mario"}}>First Name</h1>
            </Box>
            <TextField
              value={firstName}
              onChange={(evt) => {
                setFirstName(evt.target.value);
              }}
              name="firstName"
              type="text"
              inputProps={{ style: {textAlign: 'center', fontFamily: "mario"} }}
              InputProps={{ disableUnderline: true }}
            />
          </Card>
        )}
        <Box style = {{display: "flex",
          justifyContent: "right"}}>
          <Button style = {{
            margin: "10px",
            border: "3px solid #44af35"
          }} type="submit"><h3 style = {{fontFamily: "mario"}}>{displayName}</h3>
          </Button>
        </Box>
        {error && error.response && <Box> {error.response.data} </Box>}
      </form>
    </Box>
    </Grid>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error
  };
};

export const Login = connect(mapLogin)(AuthForm);
export const Signup = connect(mapSignup)(AuthForm);
