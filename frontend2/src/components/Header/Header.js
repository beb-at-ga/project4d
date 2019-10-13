import React from 'react';
import Nav from '../Nav/Nav';

const Header = props => {
  if (!props.user.id) {
    return (
      <div>
        <Nav user={props.user} updateUser={props.updateUser} />
      </div>
    );
  } else {
    return (
      <div>
        <Nav user={props.user} updateUser={props.updateUser} />
      </div>
    );
  }
};

export default Header;
