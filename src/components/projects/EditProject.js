import React, { Component } from "react";
import { editProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import moment from "moment";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

class EditProject extends Component {
  state = {
    title: "",
    content: ""
  };

  
  /*Setting the local state to the current project data
    using react router to pass the state from the Project 
    Deails component.
  */
  componentDidMount = () =>{
    const title = this.props.location.state.title
    const content = this.props.location.state.content
    this.setState({
      title: title,
      content: content
    })
    console.log('test',this.state);
  }

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
    e.preventDefault();
    let localProject = this.state;
    let docId = this.props.docId;
    this.props.editProject(localProject, docId);
    const projectDetailURL = "/project/" + docId;
    this.props.history.push(projectDetailURL); //redirect to project detail page after edit
  };

  render() {
    const { project, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Edit Project</h5>
                <div className="input-field">
                  <label htmlFor="title" className="active">
                    Title
                  </label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    id="title"
                    defaultValue={project.title}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="content" className="active">
                    Edit Project Content
                  </label>
                  <textarea
                    id="content"
                    onChange={this.handleChange}
                    className="materialize-textarea"
                    defaultValue={project.content}
                  />
                </div>
                <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted by {project.authorFirstName} {project.authorLastName}
              </div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
              <div className="right-align" />
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
    editProject: (project, docId) => dispatch(editProject(project, docId))
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
)(EditProject);
