import React from 'react';
import { BrowserRouter as Router,
          Route } from 'react-router-dom';
import Header from './Header';
import EditProfile from './EditProfile';
import HomePage from './HomePage';
import Invite from './Invite';
import Search from './Search';

function App() {
  return (
    <Router>
      <div>
        <Header />
          <Route path="/user-profile/edit" exact component={EditProfile} />
          <Route path="/" exact component={HomePage} />
          <Route path="/invite" exact component={Invite} />
          <Route path="/search" exact component={Search} />
      </div>
    </Router>
  );
}

export default App;