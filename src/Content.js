import React, { useState, useEffect } from "react";
import About from "./About.js";
import Login from "./Login.js";
import Home from "./Home.js";
import Topics from "./Topics.js";
import Tuts from "./Tuts.js";
import Player from "./videoPlayer.js";
import Courses from "./YourCourses.js";
import { Route, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function Content() {
  const [loggedStatus, setLogged] = useState(null);
  var db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("Users").doc(user.uid).set({
          userName: user.displayName,
          anonymousLogin: user.isAnonymous,
          userId: user.uid,
          email: user.email,
        });
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="master">
        <div className="sidebar">
          <ul>
            <Link to="/">
              <li>
                <i className="fas fa-home"></i>
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
              <Link to="/SavedCourses">
                <li>
                  <i className="fas fa-bookmark"></i>
                  <span>Your Courses</span>
                </li>
              </Link>
            ) : (
              <Link to="/SavedCourses" style={{ display: "none" }}>
                <li>
                  <i className="fas fa-bookmark"></i>
                  <span>Your Courses</span>
                </li>
              </Link>
            )}
            {loggedStatus ? (
              <li onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i> <span>LogOut</span>
              </li>
            ) : (
              <Link to="/Login">
                <li>
                  <i className="fas fa-users"></i>
                  <span>Sign-In</span>
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
          <Route path="/SavedCourses">
            <Courses />
          </Route>
          <Route exact path="/Topics">
            <Topics />
          </Route>
          <Route exact path="/Topics/:id">
            <Tuts />
          </Route>
          <Route exact path="/Topics/Video/:id">
            <Player />
          </Route>
        </div>
      </div>
    </>
  );
}
export default Content;