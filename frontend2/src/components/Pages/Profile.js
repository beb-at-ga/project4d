import React from 'react';
import { Redirect } from 'react-router-dom';

const Profile = props => {
  if (!props.user.id) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <p>First Name: {props.user.firstname}</p>
        <p>Last Name: {props.user.lastname}</p>
        <p>Phone: {props.user.phonenumber}</p>
        <p>Agent ID: {props.user.agent_id}</p>
        <p>Agency ID: {props.user.agency_id}</p>
      </div>
    );
  }
};

export default Profile;
