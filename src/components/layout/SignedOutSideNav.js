import React from "react";
import { NavLink } from "react-router-dom";

//When a user is NOT signed in, they will see these links in the nav bar
const SignedOutSideNav = () => {
  return (
    <ul id="slide-out" className="sidenav">
      <li>
        <NavLink to="/signin">Login</NavLink>
      </li>

      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>

      <li>
        <div className="divider" />
      </li>

      <li>
        <NavLink to="/demo">Demo</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutSideNav;
