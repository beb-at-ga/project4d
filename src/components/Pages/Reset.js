import React, { useState } from 'react';
import { Link } from 'gatsby';
import { navigate } from '@reach/router';
import { Auth } from 'aws-amplify';

import { AuthForm, Email, Password, ConfirmationCode } from '../Forms';

const Reset = () => {
  const [email, setEmail] = useState(``);
  const [auth_code, setAuth_code] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(``);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);


  // // This was awesome! I just can't make it work with hooks yet
  // const handleUpdate = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //     error: '',
  //   });
  // };

  
  const handleUpdate = event => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
      setError('');
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
      setError('');
    }
    if (event.target.name === 'auth_code') {
      setAuth_code(event.target.value);
      setError('');
    }
  };

  const reset = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      await Auth.forgotPassword(email);
      console.log('forgotPassword');

      setLoading(false);
      setStage(1);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.log('error...: ', err);
    }
  };

  const confirmReset = async e => {
    e.preventDefault();
    setLoading(true);

    Auth.forgotPasswordSubmit(email, auth_code, password)
      .then(data => {
        console.log(data);
        setLoading(false);
      })
      .then(() => navigate('/signin'))
      .catch(err => {
        setError(err);
        setLoading(false);
        console.log('error...: ', err);
      });
  };

  if (stage === 0) {
    return (
      <AuthForm title="Reset your password" error={error}>
        <Email handleUpdate={handleUpdate} email={email} autoComplete="on" />
        <button
          onClick={e => reset(e)}
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? null : 'Send Code'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>
        <p style={{ marginTop: 40 }} className="text-center">
          <Link to="/signin">Back to Sign In</Link>
        </p>
      </AuthForm>
    );
  } else {
    return (
      <React.Fragment>
        <AuthForm title="Confirm Password Update" error={error}>
          <Email handleUpdate={handleUpdate} email={email} autoComplete="on" />
          <ConfirmationCode
            handleUpdate={handleUpdate}
            email={auth_code}
            autoComplete="off"
          />
          <Password
            handleUpdate={handleUpdate}
            password={password}
            autoComplete="on"
          />
          <p style={{ marginTop: 40 }} className="text-center">
            <Link to="/signin">Back to Sign In</Link>
          </p>
          <button
            onClick={e => confirmReset(e)}
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? null : 'Confirm Reset'}
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </button>
        </AuthForm>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{ marginTop: 20, marginBottom: 20 }}
            className="text-center"
          >
            Lost your code?
          </p>
          <button
            className="btn btn-link"
            onClick={e => reset(e)}
            disabled={loading}
          >
            Resend Code
          </button>
        </div>
      </React.Fragment>
    );
  }
};

export default Reset;
