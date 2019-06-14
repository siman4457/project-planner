import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

//This is a class based component because we have to store what a user inputs into the text fields
class CreateProject extends Component {
  state = {
    title: "",
    content: ""
  };

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
    const { auth, createProject } = this.props;
    e.preventDefault(); //Prevents reload upon submit
    let proj = this.state;
    createProject(proj);
    this.props.history.push("/dashboard/" + auth.uid); //redirect to authenticated user's dashboard after creating project
  };

  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Create New Project</h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="content">Project Content</label>
              <textarea
                id="content"
                onChange={this.handleChange}
                className="materialize-textarea"
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Create</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
