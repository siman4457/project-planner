import React from "react";
import { NavLink } from "react-router-dom";

//When a user is signed in, they will see these links in the nav bar
const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/create">New Project</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          SS
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
