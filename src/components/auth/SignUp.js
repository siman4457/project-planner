import React, { Component } from "react";
import { signUp } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//This is a class based component because we have to store what a user inputs into the text fields
class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  // handleDemo = e => {
  //   e.preventDefault();
  //   console.log(this.state);
  //   const demoUser = this.state;
  //   this.props.signUp(demoUser);
  // };

  handleChange = e => {
    this.setState({
      /*using square brackets here so that we can dynamically update the 
        object property (the property is unkown upfront at runtime). This will
        give us the id for whichever input field is being updated (the email or password)
        */
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault(); //Prevents reload upon submit
    const newUser = this.state;
    this.props.signUp(newUser);
  };

  render() {
    const { auth, authError, isDemo } = this.props;
    //If the user is already logged in, redirect to the Dashboard
    if (auth.uid) {
      return <Redirect to={"/dashboard/" + auth.uid} />;
    }
    //Else pull up the sign in form or log in as a guest
    else {
      //If user clicked on demo, auto sign up as guest
      if (isDemo === true) {
        //this.setDemoCredentials();
        return (
          <div className="container">
            <h1>demo mode</h1>
            <h2>Welcome. Click to enter demo mode.</h2>
            <button
              className="btn pink lighten-1 z-depth-0"
              onClick={this.handleDemo}
            >
              Enter
            </button>
          </div>
        );
      } else {
        /*If user clicked on sign up, render sign up page. (<ight want to get rid of this in the future
        so that a bunch of random people dont sign up. Only allow sign up through firebase (only I can do this).
      */
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
              <h5 className="grey-text text-darken-3">Sign Up</h5>

              <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  onChange={this.handleChange}
                />
              </div>

              <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" onChange={this.handleChange} />
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange} />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">
                  Sign Up
                </button>
                <div className="red-text center">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>
            </form>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  const isDemo = () => {
    const url = ownProps.match.url;
    if (url === "/demo") {
      return true;
    }
  };

  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    isDemo: isDemo()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
