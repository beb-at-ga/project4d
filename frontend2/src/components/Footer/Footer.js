// import React, { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';


const Footer = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/help">User Guide</Link>
        </li>
        <li>
          <Link to="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/about">About Strofina</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
