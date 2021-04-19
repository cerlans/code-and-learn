import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import Listings from "./videoListings.js";
import "firebase/auth";
function Courses() {
const [videos,setVideos]= useState('')
const db = firebase.firestore();
useEffect(()=>{
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    let docRef = db.collection(`Users/${user.uid}/SavedVideos`)
    docRef.get().then((querySnapshot)=>{
      const tempDoc = querySnapshot.docs.map((doc)=>{
       
        return { id: doc.id, ...doc.data() }
      })
      tempDoc.length ? setVideos('Here are your courses') : console.log('Here are your courses!')
    })
  } else {
    console.log('you must be signed in')
  }
})
},[])
  return (
    <>
      <h1>{videos}</h1>
    </>
  );
}

export default Courses;
