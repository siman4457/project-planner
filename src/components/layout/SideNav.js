import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import SignedInSideNav from "./SignedInSideNav";
import SignedOutSideNav from "./SignedOutSideNav";

class SideNav extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    const uid = this.props.auth.uid;
    const { profile } = this.props;
    return (
      <div>
        {uid ? <SignedInSideNav profile={profile} /> : <SignedOutSideNav />}

        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(SideNav);
