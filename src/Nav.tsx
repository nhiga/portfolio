import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.scss";

function Nav() {
  return (
    <nav className="app__nav">
      <ul className="app__nav-list">
        <li className="app__nav-item">
          <NavLink to="/about" exact>
            about
          </NavLink>
        </li>
        <li className="app__nav-item">
          <NavLink to="/experience" exact>
            experience
          </NavLink>
        </li>
        <li className="app__nav-item">
          <NavLink to="/extras" exact>
            extras
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
