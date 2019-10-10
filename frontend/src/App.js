import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";
import BASE_URL from "./constants";

// Custom Components
import Header from "./components/Nav/Header";
import Routes from "./components/Routes";
import Footer from './components/Footer/Footer';

// Material UI Styling Components
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { useStyles, theme } from './theme';
import "./App.css";


const App = () => {
  const [user, setUser] = useState({})
  const classes = useStyles();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    // see if there is a token in localStorage
    let token = localStorage.getItem("authToken");

    if (token) {
      // console.log(`token found: ${token}`)
      axios
        .get(`${BASE_URL}/auth/current/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setUser({ user: null });
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <Header user={user} updateUser={getUser} />
            <main className={classes.main} >
              <Routes user={user} updateUser={getUser} />
            </main>
            <Footer />
          </div>
        </React.Fragment>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

