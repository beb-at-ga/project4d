import React from 'react';
import { Redirect } from 'react-router-dom';

import Events from '../Administrator/Events';

const Admin = props => {
  if (!props.user.id) {
    return <Redirect to="/" />;
  } 

  if (props.user.id && props.user.isAdmin === false) {
    return (
      <div>
        <p>{props.user.firstname} is not an admin.</p>
        <p>Unauthorized access denied.</p>
      </div>
    );
  }

  return (
    <div>
      <Events user={props.user} />
    </div>
  );
};

export default Admin;
