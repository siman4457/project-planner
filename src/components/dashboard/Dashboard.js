import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

// URL for the dashboard component is just '/' or '/dashboard'

class Dashboard extends Component {
  render() {
    //console.log(this.props);
    const { projects } = this.props; //get the projects object from the props
    return (
      <div className="dashboard container">
        {/* Divide the dashboard into a right and left side (there is a small gap btwn the two)*/}
        <div className="row">
          {/* This div will contain the project list */}
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          {/* This div will contain the notifications */}
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

// We need to be able to read from the Redux store, so we need to
// map our state from the store to our props in this component
const mapStateToProps = state => {
  //console.log(state);
  //Here, state refers to the state of our store
  return {
    projects: state.firestore.ordered.projects /******IMPORTANT*******/
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(Dashboard);
