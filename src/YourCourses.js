import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import Listings from "./videoListings.js";
import {Link} from 'react-router-dom'
import "firebase/auth";
function Courses() {
const [videos,setVideos]= useState()
const [isLoading,setLoading] = useState(false)
const db = firebase.firestore();
useEffect(()=>{
  let unmounted = false
firebase.auth().onAuthStateChanged((user)=>{

  if(user && !unmounted){
    setLoading(true)
    let docRef = db.collection(`Users/${user.uid}/SavedVideos`)
    docRef.get().then((querySnapshot)=>{
      const tempDoc = querySnapshot.docs.map((doc)=>{
       
        return { id: doc.id, ...doc.data() }
      })
    return tempDoc
    }).then((tempDoc)=>{
      let listings = tempDoc.map((value)=>{
        return  <Listings title={value.videoTitle} url={value.videoThumbnail} channel={value.channelTitle} path={value.videoId} key={value.id}/>
      })
      setVideos(listings)
    })
  } else {
    console.log('you must be signed in')
  }
})

return () =>{
  unmounted = true
  console.log('unmounted!')
}
},[])
  return (
    <>
  <div className='listingParent'>
    {videos}
    </div>
    </>
  );
}

export default Courses;
