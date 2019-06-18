import React, { Component } from "react";
import { signIn } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//This is a class based component because we have to store what a user inputs into the text fields
class Demo extends Component {
  state = {
    email: "demo@planner.com",
    password: "123456"
  };

  handleSubmit = e => {
    e.preventDefault(); //Prevents reload upon submit
    let credentials = this.state;
    this.props.signIn(credentials);
  };

  render() {
    const { auth } = this.props;

    if (auth.uid) {
      return <Redirect to={"/dashboard/" + auth.uid} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card z-depth-0 demo-card">
              <div className="card-content grey-text text-darken-3">
                <h1 className="card-title center">
                  Hey, lets take a look around.
                </h1>
                <p className="center">
                  {/* <Button className="btn-floating pink lighten-1 z-depth-0 pulse" tooltip="I am a tooltip"></Button> */}
                  <button
                    className="btn-floating pink lighten-1 z-depth-0 pulse "
                    onClick={this.handleSubmit}
                  >
                    <i className="large material-icons">arrow_forward</i>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //   const isDemo = () => {
  //     const url = ownProps.match.url;
  //     if (url === "/demo") {
  //       return true;
  //     }
  //   };

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
    //isDemo: isDemo()
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
)(Demo);
