import React from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
function Courses(){
  var db = firebase.firestore();

  var docRef = db.collection('users').get().then((snapshot)=>{
    snapshot.docs.forEach((doc) => {
      console.log(doc.data())
    })
  })
  console.log(docRef)
  return(
    <>
    <h1>Saved Courses will go here</h1>
    {}
    </>
  )
}


export default Courses