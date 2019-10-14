// import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

const Footer = props => {
  let footerContent = (
    <>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/help">User Guide</Link>
          <Link className="nav-item nav-link" to="/privacy">Privacy Policy</Link>
          <Link className="nav-item nav-link" to="/about">About Single Lead Scrub</Link>
        </div>
      </div>
    </>
  );

  return (

    <footer className="footer">
        <span>{footerContent}</span>
    </footer>

  );
};

export default Footer;
