import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

//This Navbar component is a funcitonal component because we dont need to worry about state. Just display the Navbar!

const Navbar = props => {
  const uid = props.auth.uid;
  const { profile } = props;
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to={"/dashboard/" + uid} className="brand-logo">
          Planner
        </Link>
        {/* Show links based on whether a user is logged in or not */}
        {uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  //console.log("state", state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
