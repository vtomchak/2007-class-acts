// LIBRARIES
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// FILES
import AllArtwork from './AllArtwork';
import LoginScreen from './LoginScreen'
import NewUser from './NewUser'
import Navbar from './Navbar'

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={AllArtwork} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/newuser" component={NewUser} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

