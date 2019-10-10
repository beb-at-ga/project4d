import React from 'react';
import { useStyles } from '../../theme';

import PrivacyPolicy from '../Pages/PrivacyPolicy';
import About from '../Pages/About';
import UserGuide from '../Pages/UserGuide';
import Faq from '../Pages/Faq';


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {', '}
      <a href="http://www.strofina.com">
        Strofina, Inc.,
      </a>
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();

  return (
    <footer position="fixed" className={classes.footer} >
      <Box >
        <div className='footerButtons'>
          <About />
          <Faq />
          <UserGuide />
          <PrivacyPolicy />
        </div>
      </Box>
      <Box textAlign="center" maxWidth="sm">
        <Typography variant="body1"></Typography>
        <Copyright />
      </Box>
    </footer>
  );
}

export default Footer;