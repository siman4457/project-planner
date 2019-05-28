import React from "react";

const ProjectSummary = props => {
  const { project } = props;
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="car-title">{project.title}</span>
        <p>Posted by Siman</p>
        <p className="grey-text">25th May, 2am</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
