// import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault();
    //remove jwt from local storage or cookies
    localStorage.removeItem('authToken');
    props.updateUser();
  };

  let links = '';
  if (props.user.id) {
    if (props.user.isAdmin === true) {
      links = (
        <>
          <Link className="nav-item nav-link" to="/profile">
            Profile
          </Link>
          <Link className="nav-item nav-link" to="/admin">
            Admin
          </Link>
          <Link className="nav-item nav-link" to="/" onClick={handleLogout}>
            Logout
          </Link>
        </>
      );
    } else {
      links = (
        <>
          <Link className="nav-item nav-link" to="/profile">
            Profile
          </Link>
          <Link className="nav-item nav-link" to="/" onClick={handleLogout}>
            Logout
          </Link>
        </>
      );
    }
  } else {
    links = (
      <>
        <Link className="nav-item nav-link" to="/signup">
          Sign Up
        </Link>
        <Link className="nav-item nav-link" to="/signin">
          Sign In
        </Link>
      </>
    );
  }

  let brand;
  if (props.user.id) {
    brand = (
      <>
        <a className="navbar-brand" href="/">
          Strofina Single Lead Scrub
        </a>
      </>
    );
  } else {
    brand = (
      <>
        <a className="navbar-brand" href="/">
          Strofina Single Lead Scrub
        </a>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {brand}
      <button className="navbar-toggler" type="button" data-toggle="collapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/">
            Home
          </Link>
          {links}
        </div>
      </div>
    </nav>

    // <p>Strofina Single Lead Scrub</p>
    // <p>Hi, {props.user.firstname}.</p>

    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     {links}
    //   </ul>
    // </nav>
  );
};

export default Nav;
