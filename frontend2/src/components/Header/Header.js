import React from 'react';
import Nav from '../Nav/Nav';

const Header = props => {
  if (!props.user.id) {
    return (
      <div>
        <p>Strofina Single Lead Scrub</p>
        <Nav user={props.user} updateUser={props.updateUser}/>
      </div>
    );
  } else {
    return (
      <div>
        <p>Hi, {props.user.firstname}.</p>
        <Nav user={props.user} updateUser={props.updateUser}/>
      </div>
    );
  }
};

export default Header;
