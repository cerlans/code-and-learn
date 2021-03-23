import React, { useState, useEffect } from 'react';
import About from "./About.js";
import Login from "./Login.js";
import Home from "./Home.js";
import Topics from "./Topics.js";
import { Route, Link } from "react-router-dom";
import firebase from "firebase/app";

function Content() {
  let user = firebase.auth().currentUser;
  console.log(user);
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
  }
  return (
    <>
      <div className="master">
        <div className="sidebar">
          <ul>
            <Link to="/">
              <li>
                <i className="fas fa-home">
                </i><span>Home</span>
              </li>
            </Link>
            <Link to="/About">
              <li>
                <i className="far fa-address-card">
                </i><span>About</span>
              </li>
            </Link>
            <Link to="/Topics">
              <li>
                <i className="fas fa-book-open"></i>
                <span>Topics</span>
              </li>
            </Link>
            {user ? <li onClick={logOut}> <i class="fas fa-sign-out-alt"></i> Logout</li>:<Link to='/Login'><li> <i class="fas fa-users"></i></li></Link>}
          </ul>
        </div>
        <div className="information-view">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Topics">
            <Topics />
          </Route>
        </div>
      </div>
    </>
  );
}
export default Content;