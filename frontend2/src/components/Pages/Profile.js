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

    body.id = props.user.id;
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

<div class="container form-container">
        <h2>Edit Your Profile</h2>
        <div class="panel panel-default">
          <span className="red">{message}</span>
          <form class="form-horizontal" onSubmit={handleSubmit}>
            <div class="form-group">
              <label class="control-label col-sm-2" for="agent_id">
                Agent ID:
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  id="agent_id"
                  type="number"
                  name="agent_id"
                  defaultValue={props.user.agent_id}
                ></input>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2" for="agency_id">
                Agency ID:
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  id="agency_id"
                  type="number"
                  name="agency_id"
                  defaultValue={props.user.agency_id}
                ></input>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2" for="firstname">
                First Name:
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  id="firstname"
                  type="text"
                  name="firstname"
                  defaultValue={props.user.firstname}
                ></input>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2" for="lastname">
                Last Name:
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  id="lastname"
                  type="text"
                  name="lastname"
                  defaultValue={props.user.lastname}
                ></input>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-sm-2" for="email">
                Email Address:
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  id="email"
                  type="text"
                  name="email"
                  defaultValue={props.user.email}
                ></input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="phonenumber">
                Phone Number:
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  id="phonenumber"
                  type="text"
                  name="phonenumber"
                  placeholder={props.phonenumber}
                  defaultValue={props.user.phonenumber}
                ></input>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
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
