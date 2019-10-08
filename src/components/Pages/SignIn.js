import React, { useState } from 'react';
import { Link } from 'gatsby';
import { navigate } from '@reach/router';
import { Auth } from 'aws-amplify';

import { AppUser } from '../Auth';
import { AuthForm, Email, Password } from '../Forms';

const SignIn = props => {
  const [username, setUsername] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(``);
  const [loading, setLoading] = useState(false);

  const handleUpdate = event => {

    if (event.target.name === 'email') {
      setEmail(event.target.value);
      setUsername(event.target.value);
      setError('');
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value);
      setError('');
    }
  };

  const login = async e => {
    const { setUser } = AppUser;
    e.preventDefault();
    // const { username, password } = this.state
    try {
      setLoading(true);

      await Auth.signIn(username, password);
      const user = await Auth.currentAuthenticatedUser();
      const userInfo = {
        ...user.attributes,
        username: user.username,
      };
      setUser(userInfo);
      setLoading(false);
      navigate('/home');
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log('error...: ', err);
    }
  };

  return (
    <AuthForm title="Sign in to your account" error={error}>
      <Email handleUpdate={handleUpdate} email={email} autoComplete="on" />
      <Password
        handleUpdate={handleUpdate}
        password={password}
        autoComplete="on"
      />

      <p className="text-center">
        Forgot your password? <Link to="/reset">Reset password</Link>
      </p>
      <button
        onClick={e => login(e)}
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading}
      >
        {loading ? null : 'Sign In'}
        {loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </button>
      <p style={{ marginTop: 40 }} className="text-center">
        No account? <Link to="/signup">Create account</Link>
      </p>
    </AuthForm>
  );
};

export default SignIn;
