import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Listings from "./videoListings.js";
import "firebase/auth";
function Courses() {
  var db = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //the line below is a direct path to each users saved video collections
      //the collections are user specific
      let docRef = db.collection(`Users/${user.uid}/SavedVideos`).doc(user.uid);
     docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
    } else {
    }
  });
 
  return (
    <>
      <h1>Saved Courses will go here</h1>
    </>
  );
}

export default Courses;
