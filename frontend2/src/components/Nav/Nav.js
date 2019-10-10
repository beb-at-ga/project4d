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
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      links = (
        <>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </>
      );
    }
  } else {
    links = (
      <>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {links}
      </ul>
    </nav>
  );
};

export default Nav;
