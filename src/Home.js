import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
function Home() {
  const [signInStatus, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  let user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;

      setStatus(true);
      setLoading(false);
    } else {
      setStatus(false);
      setLoading(false);
    }
  });
  let verify = () => {
    if (user.isAnonymous) {
      return (
        <>
          <h1>You Are Anonymously Signed in</h1>
          <p>Your Data Will be lost after signing out</p>
        </>
      );
    } else if (signInStatus) {
      return <h1>Welcome {user.displayName} !</h1>;
    } else {
      return <h1>Learn to code for free with curated video tutorials!</h1>;
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="parent">
          <div className="sign-in">
            {verify()}
            <div className="button-container">
              {signInStatus ? (
                <div>
                  <button
                    onClick={() => {
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          // Sign-out successful.
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div>
                  <Link to="/Login">
                    <button>Create an Account</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="photo">
            <img src="https://i.vgy.me/sTK7Wi.png" alt="sTK7Wi.png" />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;