import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
function Home() {
  const [signInStatus, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAnon,setAnon] = useState(false)
  let user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;
      user.isAnonymous ? setAnon(true) : setAnon(false)
      setStatus(true);
      setLoading(false);
    } else {
      setStatus(false);
      setLoading(false);
    }
  });

  let verify = () => {
    if (signInStatus) {
        return (
          <>
            <h1>Welcome {user.displayName}</h1>
          </>
        );
      } else if (signInStatus === false) {
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
                          setStatus(false);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Sign Out
                  </button>
                  <button onClick={()=>{console.log(isAnon)}}>Is Anon?</button>
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
/* if (user.isAnonymous) {
        return (
          <>
            <h1>Guest User detected</h1>
            <p>Your data will be lost upon signing out</p>
          </>
        );
      } else {
        return (
          <>
            <h1>Welcome {user.displayName}</h1>
          </>
        );
      } */