import React, { useState, useEffect } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import firebase from "firebase/app";

function Topics() {
  //loader class that allows the gapi client to load before the user selects a topic
  const [isLoading, setLoading] = useState(true);
  let user = firebase.auth().currentUser;

  useEffect(() => {
    gapi.load("client", loadClient);
  }, []);

  function loadClient() {
    gapi.client.setApiKey("AIzaSyCFiBdff1JxkTe4F_0auryiuqiYMIJd48g");
    return gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(
        function () {
          setLoading(false);
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }

  return (
    <>
      {isLoading ? (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="ternary-wrapper">
          <div className="topics-header">
            <h1>What do you want to learn?</h1>
            {user ? (
              <span>you are signed in</span>
            ) : (
              <div>
                <Link to="/Login">
                  <span className="sign-up" style={{ padding: "20px" }}>
                    Sign Up
                  </span>
                </Link>
                for an account to add tutorials to your subscriptions and take
                notes!
              </div>
            )}
          </div>
          <div className="topics-cont">
            <div className="topics-icons">
              <div style={{ background: "#dd4b25" }}>
                <Link to="/Topics/HTML5">
                  <div className="topics-card">
                    <div className="inner">
                      <i
                        className="fab fa-html5"
                        style={{ color: "white" }}
                      ></i>
                    </div>
                    <div className="text">
                      <p>HTML5</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div style={{ background: "#254bdd" }}>
                <Link to="/Topics/CSS3">
                  <div className="topics-card">
                    <div className="inner">
                      <i
                        className="fab fa-css3-alt"
                        style={{ color: "white" }}
                      ></i>
                    </div>
                    <div className="text">
                      <p>CSS3</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div style={{ background: "#efd81d" }}>
                <Link to="/Topics/JavaScript">
                  <div className="topics-card">
                    <div className="inner">
                      <i className="fab fa-js"></i>
                    </div>
                    <div className="text">
                      <p>Javascript</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div style={{ background: "#41b883" }}>
                <Link to="/Topics/VueJS">
                  <div className="topics-card">
                    <div className="inner">
                      <i className="fab fa-vuejs"></i>
                    </div>
                    <div className="text">
                      <p>Vue.Js</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div style={{ background: "#5ed3f3" }}>
                <Link to="/Topics/ReactJS">
                  <div className="topics-card">
                    <div className="inner">
                      <i className="fab fa-react"></i>
                    </div>
                    <div className="text">
                      <p>React.Js</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div style={{ background: "#8cbf3d" }}>
                <Link to="/Topics/NodeJS">
                  <div className="topics-card">
                    <div className="inner">
                      <i className="fab fa-node-js"></i>
                    </div>
                    <div className="text">
                      <p>Node.Js</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div style={{ background: "#4584b6" }}>
                <Link to="/Topics/Python Programming">
                  <div className="topics-card">
                    <div className="inner">
                      <i
                        className="fab fa-python"
                        style={{ color: "white" }}
                      ></i>
                    </div>
                    <div className="text">
                      <p>Python</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Topics;
