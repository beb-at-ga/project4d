import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { Link } from 'gatsby';
import { Auth } from 'aws-amplify';
import NumberFormat from 'react-number-format';

import { AuthForm, Email, Password, ConfirmationCode } from '../Forms';

const SignUp = props => {
  const [username, setUsername] = useState(``);
  const [given_name, setGiven_name] = useState(``);
  const [family_name, setFamily_name] = useState(``);
  const [password, setPassword] = useState(``);
  const [email, setEmail] = useState(``);
  const [phoneState, setPhoneState] = useState(``);
  const [auth_code, setAuth_code] = useState(``);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState(``);
  const [loading, setLoading] = useState(false);


  const handleUpdate = event => {
    console.log(event.target.value);
    if (event.target.name === 'email') {
      setEmail(event.target.value);
      setUsername(event.target.value);
      setError('');
    }

    if (event.target.name === 'phone_number') {
      setPhoneState(event.target.value);
      setError('');
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value);
      setError('');
    }

    if (event.target.name === 'given_name') {
      setGiven_name(event.target.value);
      setError('');
    }

    if (event.target.name === 'family_name') {
      setFamily_name(event.target.value);
      setError('');
    }

    if (event.target.name === 'auth_code') {
      setAuth_code(event.target.value);
      setError('');
    }

  };

  const signUp = async e => {
    e.preventDefault();
    setLoading(true);

    let phone_number = `+${phoneState.replace(/\D/g, '')}`;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number, given_name, family_name },
      });
      setStage(1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log('error signing up...', err);
    }
  };

  const resendCode = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.resendSignUp(email);

      setStage(1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log('error signing up...', err);
    }
  };

  const verify = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await Auth.verifyCurrentUserAttributeSubmit(email, auth_code);
      setLoading(false);
      navigate('/signin');
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log('error signing up...', err);
    }
  };

  const confirmSignUp = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, auth_code);
      setLoading(false);
      navigate('/signin');
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log('error signing up...', err);
    }
  };

  if (stage === 0) {
    return (
      <AuthForm title="Create a new account" error={error}>
        <div className="form-group">
          <label htmlFor="enterGivenName">First Name</label>
          <input
            onChange={handleUpdate}
            name="given_name"
            type="text"
            value={given_name}
            className="form-control"
            autoComplete="off"
            id="enterGivenName"
            aria-describedby="given_nameHelp"
            placeholder="Enter First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="enterFamilyName">Last Name</label>
          <input
            onChange={handleUpdate}
            name="family_name"
            type="text"
            value={family_name}
            className="form-control"
            autoComplete="off"
            id="enterFamilyName"
            aria-describedby="family_nameHelp"
            placeholder="Enter Last Name"
          />
        </div>

        <Email
          handleUpdate={handleUpdate}
          email={email}
          autoComplete="off"
        />

        <Password
          handleUpdate={handleUpdate}
          password={password}
          autoComplete="off"
        />

        <div className="form-group">
          <label htmlFor="enterPhoneNumber">Phone Number</label>
          <NumberFormat
            placeholder="+1 (###) ###-####"
            onChange={handleUpdate}
            name="phone_number"
            value={phoneState}
            type="tel"
            className="form-control"
            format="+1 (###) ###-####"
            mask="_"
            id="enterPhoneNumber"
          />
        </div>

        <button
          onClick={e => signUp(e)}
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? null : 'Create Account'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>
        <p style={{ marginTop: 40 }} className="text-center">
          Have an account? <Link to="/signin">Sign in</Link>
        </p>
      </AuthForm>
    );
  } else {
    return (
      <AuthForm>
        <Email
          handleUpdate={handleUpdate}
          email={email}
          autoComplete="off"
        />

        <ConfirmationCode
          handleUpdate={handleUpdate}
          auth_code={auth_code}
          autoComplete="off"
        />

        <button
          onClick={e => confirmSignUp(e)}
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? null : 'Confirm'}
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>
        <p style={{ marginTop: 40 }} className="text-center">
          Have an account? <Link to="/signin">Sign in</Link>
        </p>
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
            onClick={e => resendCode(e)}
            disabled={loading}
          >
            Resend Code
          </button>
        </div>
      </AuthForm>
    );
  }
};

export default SignUp;
