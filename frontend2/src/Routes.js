import React from 'react';
import { Route } from 'react-router-dom';

// Custome components
import Home from './components/Pages/Home';
import Signup from './components/Pages/Signup';
import Signin from './components/Pages/Signin';
import Profile from './components/Pages/Profile';
// import Signout from './components/Pages/Signout';
// import DeleteUser from './components/Pages/DeleteUser';
import About from './components/Pages/About';
import Privacy from './components/Pages/Privacy';
import Help from './components/Pages/Help';
import Admin from './components/Pages/Admin';

const Routes = props => {
  return (
    <div>
      <Route exact path="/" render={() => <Home user={props.user} />} />

      <Route
        path="/signup"
        render={() => (
          <Signup user={props.user} updateUser={props.updateUser} />
        )}
      />

      <Route
        path="/signin"
        render={() => (
          <Signin user={props.user} updateUser={props.updateUser} />
        )}
      />

      <Route
        path="/profile"
        render={() => (
          <Profile user={props.user} updateUser={props.updateUser} />
        )}
      />

      <Route path="/help" render={() => <Help user={props.user} />} />
      <Route path="/about" render={() => <About user={props.user} />} />
      <Route path="/privacy" render={() => <Privacy user={props.user} />} />

      <Route path="/admin" render={() => <Admin user={props.user} />} />

    </div>
  );
};

export default Routes;
