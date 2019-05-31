import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

// URL for the dashboard component is just '/' or '/dashboard'

class Dashboard extends Component {
  render() {
    //console.log(this.props);
    const { projects, auth, notifications } = this.props; //get the projects object from the props

    //If there is no uid present, that means there is no user logged in
    if (!auth.uid) {
      // If a user is not logged in, then redirect to signin page
      return <Redirect to="/signin" />;
    }
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
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

// We need to be able to read from the Redux store, so we need to
// map our state from the store to our props in this component
const mapStateToProps = state => {
  //Here, state refers to the state of our store
  console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

/*****GRABBING DATA FROM FIRESTORE ******/
//we can add aditional options on how we recieve the data!
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ['createdAt', 'desc'] },
    { collection: "notifications", limit: 3, orderBy: ["time", 'desc'] } //ordering time in descending order
  ])
)(Dashboard);
