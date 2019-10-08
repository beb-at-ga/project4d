import React from 'react';
import { Link } from 'gatsby';

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand">
        <Link className="text-center" to="/">
          <h1 className="navbar-brand mb-0 text-primary">Single Lead Scrub</h1>
        </Link>
        <div className="navbar-nav-scroll d-flex flex-grow-1" />
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav bd-navbar-nav flex-row">
            <li className="nav-item">
              <Link className="text-center" to="/signin">
                <p style={{ margin: 0 }} className="nav-link">
                  Sign In
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="text-center" to="/signup">
                <p style={{ margin: 0 }} className="nav-link">
                  Register
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
