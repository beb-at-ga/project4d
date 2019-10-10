import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  let legalIpsum = [];
  for (let i = 0; i <= 1; i++) {
    legalIpsum.push(
      [
        'Subject to the intellectual property rights of any payment or license. In the absence of any Contributor under this Agreement. Licensed Product, and you want it, that you distribute of the material terms or conditions of Clause 6, above, are met for every component of the possibility of such entity. Contribution." "Contributor" shall mean the union of the General Public License does not infringe the patent or other fee is hereby granted, provided that each external component clearly identifies itself as the Derived Program under their own license agreement, such license applies only to those patent claims licensable by a Contributor, and only if you distribute copies of Original Code the copyright holder saying it may be required by applicable law) under this Agreement, including all modules it contains, plus any associated interface definition files, scripts used to endorse or promote products or services of Licensee, or any other intellectual property rights (other than as may be filtered to exclude very small or irrelevant contributions.) This applies to any "LaTeX-Format", and both "Copyright Holder" and "Current Maintainer" A person or entity that distributes the Program, modifications to the Work, provide any other combinations which include the Program (independent of having been made by previous Contributors, are available for at least twelve (12) months after a new version of the General Public License instead.) You can apply it to code to which you hold the copyright holder who places the Program by such Contributor itself or anyone acting on such Contributor"s behalf.',
      ].map((txt, idx) => <p key={idx}>{txt}</p>)
    );
  }

  return (
    <div>
      <Button onClick={handleClickOpen} className={classes.button}>
        Privacy Policy
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Privacy Policy
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>{legalIpsum}</Container>
        <Button color="inherit" onClick={handleClose}>
          Close
        </Button>
      </Dialog>
    </div>
  );
};

export default PrivacyPolicy;
