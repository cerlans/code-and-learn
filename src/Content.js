import React, { useState, useEffect } from "react";
import About from "./About.js";
import Login from "./Login.js";
import Home from "./Home.js";
import Topics from "./Topics.js";
import Tuts from './Tuts.js';
import { Route, Link, Switch } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
function Content() {
  const [loggedStatus,setLogged] = useState(null)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogged(true)
      console.log(user)
    } else {
     setLogged(false)
      console.log(user)
    }
  })
  })
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
                <i className="fas fa-home" ></i>
                <span>Home</span>
              </li>
            </Link>
            <Link to="/About">
              <li>
                <i className="far fa-address-card"></i>
                <span>About</span>
              </li>
            </Link>
            <Link to="/Topics">
              <li>
                <i className="fas fa-book-open"></i>
                <span>Topics</span>
              </li>
            </Link>
            {loggedStatus ? (
              <li onClick={logOut}>
                
                <i className="fas fa-sign-out-alt"></i> Logout
              </li>
            ) : (
              <Link to="/Login">
                <li>
                  <i className="fas fa-users"></i>Sign In
                </li>
              </Link>
            )}
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
            <Route exact path="/Topics">
              <Topics />
            </Route>
            <Route exact path = '/Topics/:id'>
             <Tuts/>
            </Route>
        </div>
      </div>
    </>
  );
}
export default Content;