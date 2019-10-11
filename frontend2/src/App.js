import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import BASE_URL from './constants';

// Custome components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Routes from './Routes';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    // see if there is a token in localStorage
    let token = localStorage.getItem('authToken');

    if (token) {
      console.log(`Found Token. Getting new one...`);
      axios
        .get(`${BASE_URL}/auth/current/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    <Router>
      <div className="App">
        <div>
          <Header user={user} updateUser={getUser} />
          <main>
            {/* <p>I'm the application root.</p> */}
            {/* <p>{user.firstname}</p> */}
            <Routes user={user} updateUser={getUser} />
          </main>
          <Footer user={user} updateUser={getUser}/>
        </div>
      </div>
    </Router>
  );
};

export default App;
