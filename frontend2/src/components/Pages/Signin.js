import React, { useState } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import BASE_URL from '../../constants';
import { Redirect } from 'react-router-dom';

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
    console.log(`Sumbitting: ${body}`);
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
        setMessage('An error occured. Please try again or contact us for assistance.')
      });
  };

  if (props.user.id || redirect === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h2>Sign In</h2>
        <span className="red">{message}</span>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
          ></input>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          ></input>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
};

export default Signup;
