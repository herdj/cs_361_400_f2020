import React from 'react';
import './App.css';

function App() {
  return (
  <nav className="navbar navbar-expand-lg navbar-light">
    <a className="navbar-brand" href="#">Expert Classmate</a>
    <div class="collapse navbar-collapse">
      <div className="navbar-nav">
        <a className="nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
        <a className="nav-link" href="#">My Network</a>
        <a className="nav-link" href="#">Find Expert</a>
        <a className="nav-link" href="#">Messages</a>
      </div>
      <div className="navbar-nav ml-auto">
        <a className="nav-link" href="#">Invite a Friend</a>
        <a className="nav-link" href="#">Login</a>
        <a className="nav-link" href="#">Sign Up</a>
        <a className="nav-link" href="#">Logout</a>
      </div>
    </div>
  </nav>
  );
}

export default App;
