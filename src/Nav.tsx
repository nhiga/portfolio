import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.scss";

interface NavProps {
  onClick?: () => void;
}

function Nav({ onClick }: NavProps) {
  return (
    <nav className="app__nav">
      <ul className="app__nav-list">
        <li className="app__nav-item">
          <NavLink to="/about" onClick={onClick} exact>
            about
          </NavLink>
        </li>
        <li className="app__nav-item">
          <NavLink to="/experience" onClick={onClick} exact>
            experience
          </NavLink>
        </li>
        <li className="app__nav-item">
          <NavLink to="/extras" onClick={onClick} exact>
            extras
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
