import React, { useState } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import BASE_URL from '../../constants';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import Home from './Home';

const Signup = props => {
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let body = {};
    body.email = e.target.email.value;
    body.password = e.target.password.value;

    // console.log(body, BASE_URL);
    // console.log(`Sumbitting: ${body}`);
    axios
      .post(`${BASE_URL}/auth/login`, body)
      .then(response => {
        console.log(response);
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
        <h2>Sign In</h2>
        <span className="red">{message}</span>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="emailInput">
            <Form.Label>Your Email Address:</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              defaultValue={props.user.email}
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
          <Button type="submit">Sign In</Button>
        </Form>
      </div>
    );
  }
};

export default Signup;
