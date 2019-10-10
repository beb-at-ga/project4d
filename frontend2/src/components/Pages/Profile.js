import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Profile = props => {
  const [editMode, setEditMode] = useState(false);

  let isAdmin;
  if (props.user.isAdmin) {
    isAdmin = 'True';
  } else {
    isAdmin = 'False';
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  let stuff;
  if (editMode === false) {
    stuff = (
      <div>
        <p>Edit Form Here</p>
        <button onClick={handleEditMode}>Fake Save</button>
      </div>
    );
  } else {
    stuff = (
      <div>
        <p>First Name: {props.user.firstname}</p>
        <p>Last Name: {props.user.lastname}</p>
        <p>Phone: {props.user.phonenumber}</p>
        <p>Agent ID: {props.user.agent_id}</p>
        <p>Agency ID: {props.user.agency_id}</p>
        <p>Is Admin: {isAdmin}</p>

        <button onClick={handleEditMode}>Edit</button>
      </div>
    );
  }

  if (!props.user.id) {
    return <Redirect to="/" />;
  } else {
    return <div>{stuff}</div>;
  }
};

export default Profile;
