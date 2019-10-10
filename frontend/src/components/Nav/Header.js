import React, { useState, useMemo, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = props => {
  const classes = useStyles();

  let headerString = '';
  if (props.user.firstname) {
    headerString = `Hi, ${props.user.firstname}! Welcome to Single Lead Scrub`;
  } else {
    headerString = 'Strofina Single Lead Scrub';
  }

  // if (props.user._id) {
  //   menuItems = (
  //     <div className={classes.list} role="presentation">
  //       <List component="nav" aria-label="TODO">
  //         <ListItemLink to="/" primary="Home" icon={<InboxIcon />} />
  //         <ListItemLink
  //           to="/profile"
  //           primary="My Profile"
  //           icon={<InboxIcon />}
  //         />
  //       </List>
  //       <List component="nav" aria-label="TODO">
  //         <ListItemLink to="/logout" primary="Logout" icon={<DraftsIcon />} />
  //       </List>
  //     </div>
  //   );
  // } else {
  //   menuItems = (
  //     <div className={classes.list} role="presentation">
  //       <List component="nav" aria-label="TODO">
  //         <ListItemLink to="/" primary="Home" icon={<InboxIcon />} />
  //         <ListItemLink to="/signup" primary="Signup" icon={<DraftsIcon />} />
  //         <ListItemLink to="/login" primary="Login" icon={<DraftsIcon />} />
  //       </List>
  //     </div>
  //   );
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            {headerString}
          </Typography>

          <Button href="/profile" className={classes.button}>
            Link
          </Button>

          <Button
            onClick={() => {
              alert("I'm a button.");
            }}
          >
            Button Link
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// import React from 'react';
// import Nav from './Nav';
// import Link from '@material-ui/core/Link';

// import Toolbar from '@material-ui/core/Toolbar';

// const Header = (props) => {

//   return (
//     <div>
//       <Toolbar >
//         <Nav user={props.user} updateUser={props.updateUser} />
//         {/* <Button color="inherit">Login</Button> */}
//       </Toolbar>
//     </div>
//   )
// }

export default Header;
