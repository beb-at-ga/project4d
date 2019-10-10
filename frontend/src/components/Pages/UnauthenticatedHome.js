import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    fontSize: 40,
    fontFamily: 'fantasy',
  },
}));

const UnauthenticatedHome = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container justify="center" alignItems="stretch">
          <h1 className="welcomeHeader">Unauthenticated Home</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default UnauthenticatedHome;
