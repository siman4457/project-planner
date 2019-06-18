import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { Link } from "react-router-dom";

//When a user is signed in, they will see these links in the nav bar
const SignedInSideNav = props => {
  const { uid, profile } = props;
  return (
    <div>
      <ul id="slide-out" className="sidenav">
        <li className="side-nav-initials">
          <NavLink to={"/dashboard/" + uid} className="btn blue lighten-1">
            {profile.initials}
          </NavLink>
        </li>

        <li>
          <Link to={"/dashboard/" + uid}>
            <i className="material-icons">dashboard</i>Dashboard
          </Link>
        </li>

        <li>
          <NavLink to={"/create/" + uid}>
            <i className="material-icons">edit</i>New Project
          </NavLink>
        </li>

        <li>
          <div className="divider" />
        </li>

        <li>
          <a href="/signin" onClick={props.signOut}>
            <i className="material-icons">arrow_back</i>Log Out
          </a>
        </li>
      </ul>
    </div>
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
)(SignedInSideNav);
