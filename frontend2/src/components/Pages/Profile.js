import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../constants';

const Profile = props => {
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(false);

  let isAdmin;
  if (props.user.isAdmin) {
    isAdmin = 'True';
  } else {
    isAdmin = 'False';
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let body = {};

    body.id = props.user.id
    body.firstname = e.target.firstname.value;
    body.lastname = e.target.lastname.value;
    body.email = e.target.email.value;
    body.agency_id = e.target.agency_id.value;
    body.agent_id = e.target.agent_id.value;
    body.phonenumber = e.target.phonenumber.value;

    let token = localStorage.getItem('authToken');

    if (token) {
      // console.log(`token found: ${token}`);
      axios
        .post(`${BASE_URL}/user/current`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          localStorage.setItem('authToken', response.data.token);
          props.updateUser();
          setEditMode(!editMode);
        })
        .catch(err => {
          console.log(err);
          setMessage(
            'An error occured. Please try again or contact us for assistance.'
          );
        });
    }
  };

  let stuff;
  if (editMode === true) {
    stuff = (
      <div>
        <h2>Edit Form Here</h2>
        <span className="red">{message}</span>
        <form onSubmit={handleSubmit}>
          <input
            id="agent_id"
            type="number"
            name="agent_id"
            // placeholder="Agent Number"
            defaultValue={props.user.agent_id}
          ></input>
          <input
            id="agency_id"
            type="number"
            name="agency_id"
            // placeholder="Agency ID"
            defaultValue={props.user.agency_id}
          ></input>
          <input
            id="firstname"
            type="text"
            name="firstname"
            // placeholder="First Name"
            defaultValue={props.user.firstname}
          ></input>
          <input
            id="lastname"
            type="text"
            name="lastname"
            // placeholder="Last Name"
            defaultValue={props.user.lastname}
          ></input>
          <input
            id="email"
            type="email"
            name="email"
            // placeholder="Email Address"
            defaultValue={props.user.email}
          ></input>
          <input
            id="phonenumber"
            type="text"
            name="phonenumber"
            placeholder={props.phonenumber}
            defaultValue={props.user.phonenumber}
          ></input>
          <button type="submit">
            Save
          </button>
        </form>
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
