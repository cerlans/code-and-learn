import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import Listings from "./videoListings.js";
import "firebase/auth";
function Courses() {
const [isCourses,setCourses] = useState(false)
const db = firebase.firestore();
useEffect(()=>{
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    let docRef = db.collection(`Users/${user.uid}/SavedVideos`)
    docRef.get().then((querySnapshot)=>{
      const tempDoc = querySnapshot.docs.map((doc)=>{
       
        return { id: doc.id, ...doc.data() }
      })
      console.log(tempDoc)
    })
  } else {
    console.log('you must be signed in')
  }
})
},[])
  return (
    <>
      <h1>Saved Courses will go here</h1>
    </>
  );
}

export default Courses;
