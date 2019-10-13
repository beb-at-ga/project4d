// import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

const Footer = props => {
  let footerContent = (
    <>
      <div class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-nav">
          <Link class="nav-item nav-link" to="/help">User Guide</Link>
          <Link class="nav-item nav-link" to="/privacy">Privacy Policy</Link>
          <Link class="nav-item nav-link" to="/about">About Strofina</Link>
        </div>
      </div>
    </>
  );

  return (

    <footer class="footer">
        <span>{footerContent}</span>
    </footer>

  );
};

export default Footer;
