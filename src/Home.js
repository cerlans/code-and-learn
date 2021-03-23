import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
function Home() {
  //monitors the sign in status, false = not logged in, true = logged in
  const [signInStatus, setStatus] = useState(false);
  const [isLoading,setLoading] = useState(true)
  // this functon here monitors the state whether a user is signed in or not
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     
      let uid = user.uid;
      console.log(uid);
      setStatus(true);
      setLoading(false);
    } else {
     
      setStatus(false);
      setLoading(false);
    }
   
  })
  var user = firebase.auth().currentUser;
  console.log(user)
;
  return (
    <>
      { isLoading ? <div className='loader-parent'><div className='loader'></div></div> : <div className="parent">
        <div className="sign-in">
          {signInStatus ? <h1>Welcome {user.displayName}! </h1> : <h1>Learn to code for free with curated video tutorials!</h1>}
          <div className="button-container">
              {signInStatus ? <div>
          <button
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                 
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