import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, error } = props;
  const [email, setEmail] = useState("cody@charm.com");
  const [password, setPassword] = useState("123");
  const [firstName, setFirstName] = useState("Cody");
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(name === 'signup') {
      dispatch(authenticate(name, {email, password, firstName}));
    }
    else {
      dispatch(authenticate(name, {email, password}));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="Email">
            <small>Email</small>
          </label>
          <input value={email} onChange={(evt) => {setEmail(evt.target.value)}} name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input value={password} onChange={(evt) => {setPassword(evt.target.value)}} name="password" type="password" />
        </div>
        {
          name === "signup" &&
            <div>
              <label htmlFor="First Name">
                <small>First Name</small>
              </label>
              <input value={firstName} onChange={(evt) => {setFirstName(evt.target.value)}} name="firstName" type="text" />
            </div>
        }

        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
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
