import React, { Component } from "react";
import { connect } from "react-redux";
import SignedInSideNav from "./SignedInSideNav";
import SignedOutSideNav from "./SignedOutSideNav";

class Sidebar extends Component {
  render() {
    const uid = this.props.auth.uid;
    const { profile } = this.props;
    return (
      <div className="hide-on-large-only">
        {uid ? <SignedInSideNav profile={profile} /> : <SignedOutSideNav />}
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

export default connect(mapStateToProps)(Sidebar);
