import React, { Component } from "react";
import ProjectSummary from "../projects/ProjectSummary";
import { Link } from "react-router-dom";

class ProjectList extends Component {
  render() {
    const { projects, uid } = this.props;

    return (
      <div className="project-list section">
        {projects &&
          projects.map(project => {
            if (project.authorId === uid) {
              return (
                <Link to={"/project/" + project.id} key={project.id}>
                  <ProjectSummary project={project} />
                </Link>
              );
            }
            //return(<404Pafe/>)
          })}
      </div>
    );
  }
}

export default ProjectList;
