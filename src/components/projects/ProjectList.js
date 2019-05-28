import React from "react";
import ProjectSummary from "../projects/ProjectSummary";
import { Link } from "react-router-dom";

/* You could directly destructure the props into projects
in the argument like this: const ProjectList = props => */
const ProjectList = props => {
  const { projects } = props;
  return (
    <div className="project-list section">
      {projects &&
        projects.map(project => {
          return (
            <Link to={"/project/" + project.id} key={project.id}>
              <ProjectSummary project={project} />
            </Link>
          );
        })}
    </div>
  );
};

export default ProjectList;
