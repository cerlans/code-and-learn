import React, { useState, useEffect } from "react";
import Test from "./Test.js";
import { Link, Route, useRouteMatch } from "react-router-dom";

import firebase from "firebase/app";
function Topics() {
  const [query, setQuery] = useState("");
  let { path, url } = useRouteMatch();

  let user = firebase.auth().currentUser;
  // i have to useParams for the link on line 60, a new component has to be rendered, not the same one, but also be a part off the topics component, the guy makes a seperate component, but still denotes the same component that it was used in within the url, the location has to be from within this parameter
  function loadClient() {
    gapi.client.setApiKey("AIzaSyCFiBdff1JxkTe4F_0auryiuqiYMIJd48g");
    return gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.youtube.search
      .list({
        part: ["snippet"],
        maxResults: 10,
        q: query,
        type: ["video"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  function loader() {
    let tester = loadClient().then(function () {
      execute();
    });
  }

  gapi.load("client", function () {
    console.log("finished loading");
  });
  return (
    <>
      <div className="topics-header">
        <button onClick={loadClient}>Load Client</button>
        <button onClick={execute}>Search</button>
        <h1>What do you want to learn?</h1>
        {user ? (
          <div>you are signed in</div>
        ) : (
          <div>
            <Link to="/Login">
              <span className="sign-up">Sign Up</span>
            </Link>
            for an account to add tutorials to your subscriptions and take
            notes!
          </div>
        )}
      </div>
      <div className="topics-cont">
        <div className="topics-icons">
        <Link to={`${url}/HTML5`}>
          <div
            className="topics-card"
            onClick={function () {
              setQuery("html5");
            }}
            style={{ background: "#dd4b25" }}
          >
            <div className="inner">
              <i class="fab fa-html5" style={{ color: "white" }}></i>
            </div>
            <div className="text">
              <p>HTML5</p>
            </div>
          </div>
          </Link>
          <div
            className="topics-card"
            onClick={function () {
              setQuery("css3");
            }}
            style={{ background: "#254bdd" }}
          >
            <div className="inner">
              <i class="fab fa-css3-alt"  onClick={loader} style={{ color: "white" }}></i>
            </div>
            <div className="text">
              <p>CSS3</p>
            </div>
          </div>
          <div
            className="topics-card"
            onClick={function () {
              setQuery("JavaScript");
            }}
            style={{ background: "#efd81d" }}
          >
            <div className="inner">
              <i class="fab fa-js"></i>
            </div>
            <div className="text">
              <p>Javascript (ES6)</p>
            </div>
          </div>
          <div className="topics-card" style={{ background: "#41b883" }}>
            <div className="inner">
              <i class="fab fa-vuejs"></i>
            </div>
            <div className="text">
              <p>Vue.Js</p>
            </div>
          </div>
          <div className="topics-card" style={{ background: "#5ed3f3" }}>
            <div className="inner">
              <i class="fab fa-react"></i>
            </div>
            <div className="text">
              <p>React.Js</p>
            </div>
          </div>
          <div className="topics-card" style={{ background: "#8cbf3d" }}>
            <div className="inner">
              <i class="fab fa-node-js"></i>
            </div>
            <div className="text">
              <p>Node.Js</p>
            </div>
          </div>
          <div className="topics-card" style={{ background: "#4584b6" }}>
            <div className="inner">
              <i class="fab fa-python" style={{ color: "white" }}></i>
            </div>
            <div className="text">
              <p>Python</p>
            </div>
          </div>
        </div>
        <Route path="/Topics/number"></Route>
      </div>
    </>
  );
}

export default Topics;