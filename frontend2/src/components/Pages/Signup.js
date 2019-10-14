import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import BASE_URL from '../../constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    // console.log(`Sumbitting: ${body}`);
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
      <div className="container form-container">
        <h1>Sign Up</h1>
        <span className="red">{message}</span>
        <Form onSubmit={handleSubmit}>

        <Form.Group controlId="agencyIdInput">
            <Form.Label>Agency ID</Form.Label>
            <Form.Control
              name="agency_id"
              type="number"
              placeholder="12345"
            />
          </Form.Group>

          <Form.Group controlId="agentIdInput">
            <Form.Label>Agent ID</Form.Label>
            <Form.Control
              name="agent_id"
              type="number"
              placeholder="12345"
            />
          </Form.Group>

          <Form.Group controlId="emailInput">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Your email address"
            />
          </Form.Group>


          <Form.Group controlId="firstnameInput">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstname"
              type="text"
              placeholder="Your first name"
            />
          </Form.Group>

          <Form.Group controlId="lastnameInput">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastname"
              type="text"
              placeholder="Your last name"
            />
          </Form.Group>


          <Form.Group controlId="phonenumberInput">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              name="phonenumber"
              type="phone"
              placeholder="+1 (888) 555-1212"
            />
          </Form.Group>

          <Form.Group controlId="passwordInput">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="***********"
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>


    );
  }
};

export default Signup;
