import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { deleteProject } from "../../store/actions/projectActions";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "react-materialize";

class ProjectDetails extends Component {
  render() {
    const { project, auth, docId } = this.props;
    

    const handleDelete = e => {
      e.preventDefault();
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Don't give up!</p>
              <button
                className="btn pink lighten-1 z-depth-0"
                onClick={onClose}
              >
                No
              </button>
              &nbsp; &nbsp;
              <button
                className="btn pink lighten-1 z-depth-0"
                onClick={() => {
                  this.props.deleteProject(project, docId);
                  onClose();
                  this.props.history.push("/dashboard/" + project.authorId); //redirect to homepage after creating project
                }}
              >
                Yes
              </button>
            </div>
          );
        }
      });
    };

    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted by {project.authorFirstName} {project.authorLastName}
              </div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>

              <div className="right-align">
                <Link to={{
                  pathname:"/edit/" + docId,
                  state: {
                      title: project.title,
                      content: project.content
                    }
                  }} 
                key={docId}>
                  <button className="btn pink lighten-1 z-depth-0">Edit</button>
                </Link>
                {/* <Button className="btn pink lighten-1 z-depth-0" waves="light" node="a" href={"/edit/" + docId}>Edit</Button> */}
                &nbsp;
                <button
                  onClick={handleDelete}
                  value={auth}
                  className="btn pink lighten-1 z-depth-0"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  //id = the document id of the project
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth,
    docId: id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: (project, docId) => dispatch(deleteProject(project, docId))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "projects"
    }
  ])
)(ProjectDetails);
