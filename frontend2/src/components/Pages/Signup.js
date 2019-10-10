import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import BASE_URL from '../../constants';

// import Home from './Home';

const Signup = props => {
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    let body = {};

    body.firstname = e.target.firstname.value;
    body.lastname = e.target.lastname.value;
    body.email = e.target.email.value;
    body.password = e.target.password.value;
    body.agency_id = e.target.agency_id.value;
    body.agent_id = e.target.agent_id.value;
    body.phonenumber = e.target.phonenumber.value;

    // console.log(body, BASE_URL);
    console.log(`Sumbitting: ${body}`);
    axios
      .post(`${BASE_URL}/auth/signup`, body)
      .then(response => {
        localStorage.setItem('authToken', response.data.token);
        props.updateUser();
        setRedirect(true);
      })
      .catch(err => {
        console.log(err);
        setMessage(
          'An error occured. Please try again or contact us for assistance.'
        );
      });
  };

  if (props.user.id || redirect === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h2>Signup</h2>
        <span className="red">{message}</span>
        <form onSubmit={handleSubmit}>
          <input
            id="agent_id"
            type="number"
            name="agent_id"
            placeholder="Agent Number"
          ></input>
          <input
            id="agency_id"
            type="number"
            name="agency_id"
            placeholder="Agency ID"
          ></input>
          <input
            id="firstname"
            type="text"
            name="firstname"
            placeholder="First Name"
          ></input>
          <input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Last Name"
          ></input>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
          ></input>
          <input
            id="phonenumber"
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
          ></input>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          ></input>
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
};

export default Signup;
