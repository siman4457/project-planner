import React, { Component } from "react";
import ProjectSummary from "../projects/ProjectSummary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProjectList extends Component {
  render() {
    const { projects, uid } = this.props;

    return (
      <div className="project-list section">
        {projects &&
          projects.map(project => {
            console.log(project);
            if (project.authorId === uid) {
              return (
                <Link to={"/project/" + project.id} key={project.id}>
                  <ProjectSummary project={project} />
                </Link>
              );
            }
          })}
      </div>
    );
  }
}

export default ProjectList;
