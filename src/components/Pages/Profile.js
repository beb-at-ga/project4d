import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { Auth } from 'aws-amplify';
import Card from 'react-bootstrap/Card';

import { getCurrentUser } from '../Auth/AppUser';
import { AppContent } from '../Layout';

const Profile = () => {
  const [jwt, setJwt] = useState();
  const user = getCurrentUser();

  useEffect(() => {
    getToken();
  },[]);

  const getToken = async () => {
    setJwt((await Auth.currentSession()).getAccessToken().getJwtToken());
    // setJwt((await Auth.currentSession()).getIdToken());

  };

  return (
    <div className="container-login">
      <AppContent>
        <h1>Here's the Profile Page</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number}</p>
        <Card>
          <Card.Body>
            <Card.Title>JWT</Card.Title>
            <Card.Text>{jwt}</Card.Text>
          </Card.Body>
        </Card>
        <Link to="/home">Home</Link>
      </AppContent>
    </div>
  );
};

export default Profile;
