import React from 'react';
import { BrowserRouter as Router,
          Route } from 'react-router-dom';
import Header from './Header';
import EditProfile from './EditProfile';
import HomePage from './HomePage';
import Invite from './Invite';
import Search from './Search';
import ViewProfile from './ViewProfile';
import PopupTest from './PopupTest';
import InviteLanding from "./InviteLanding";

function App() {
  return (
    <Router>
      <div>
        <Header />
          <Route path="/user-profile/edit" exact component={EditProfile} />
          <Route path="/" exact component={HomePage} />
          <Route path="/invite" exact component={Invite} />
          <Route path="/search" exact component={Search} />
          <Route path="/popup-test" exact component={PopupTest} />
          <Route path="/view-profile/:id" exact component={ViewProfile} />
          <Route path="/invite-landing" exact component={InviteLanding} />
      </div>
    </Router>
  );
}

export default App;