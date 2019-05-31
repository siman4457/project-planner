import React, { Component } from "react";
import { signIn } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//This is a class based component because we have to store what a user inputs into the text fields
class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

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
    let credentials = this.state;
    console.log("login credentials entered: ", credentials);
    this.props.signIn(credentials);
  };

  render() {
    const authErr = this.props.authError;
    const { auth } = this.props; //same as above

    if (auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="red-text center">
              {authErr ? <p>Invalid login, try again lol</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
