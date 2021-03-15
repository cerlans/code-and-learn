import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
function Home() {
  const [status, setStatus] = useState(false);
  const [isLoading,setLoading] = useState(true)
  // this functon here monitors the state whether a user is signed in or not
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      let uid = user.uid;
      console.log(uid);
      setStatus(true);
      setLoading(false);
    } else {
      // User is signed out
      // ...
      setStatus(false);
      setLoading(false);
    }
   
  })
  var user = firebase.auth().currentUser;
  console.log(user)
;
  return (
    <>
      { isLoading ? <div className='loader-parent'><div className='loader'></div></div>: <div className="parent">
        <div className="sign-in">
          <h1>Learn to code for free with curated video tutorials!</h1>
          <div className="button-container">
              {status ? <div>
          <button
            onClick={function () {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            Sign Out
          </button>
         </div> : <div>
           <Link to="/Login">
              <button>Create an Account</button>
            </Link>
         </div>}
          </div>
        </div>
        <div className="photo">
          <img src="https://i.vgy.me/sTK7Wi.png" alt="sTK7Wi.png" />
        </div>
      </div> 
      
      }
    </>
  );
}

export default Home;