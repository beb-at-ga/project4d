import React from 'react';
import { Redirect } from 'react-router-dom';

// import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const Profile = (props) => {
  if (!props.user) {
    return <Redirect to='/' />
  }

  return (
    <Box>
      <h1>This is the home page for {props.user.firstname}</h1>
    </Box>
  )
}

export default Profile;