import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

//When a user is signed in, they will see these links in the nav bar
const SignedInLinks = props => {
  const { uid } = props;
  return (
    <ul className="right">
      <li>
        <NavLink to={"/create/" + uid}>New Project</NavLink>
      </li>
      <li>
        <a href="/signin" onClick={props.signOut}>
          Log Out
        </a>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLinks);
