import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useParams, Link, useLocation } from "react-router-dom";

function Player() {
  let { id } = useParams();
  const [video, setVideo] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogged] = useState(null);
  const [userId,setId] = useState()
  const [buttonText,setButtonText] = useState('Add to your courses')
  const [currentClass,toggleClass] = useState('addCourseButton')
  let data = useLocation();

  var db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let id= user.uid
        setId(id)
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);
  
  useEffect(() => {
    execute();
  }, []);

  function execute() {
    return gapi.client.youtube.videos
      .list({
        part: ["snippet,contentDetails,statistics"],
        id: [id],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).

          setVideo(response.result.items[0].snippet);
          setLoading(false);
        },
        function (err) {
          console.error("Execute error", err);
          setLoading(false);
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
        <>
          <div className="iframePanel">
            <h1>{` '${video.title}' by ${video.channelTitle}`}</h1>
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title="video"
            />
            {isLogged ? (
              <div>
                <button className={currentClass} onClick={()=>{
                   db.collection(`Users/${userId}/SavedVideos`)
                    .add({
                        channelTitle: video.channelTitle,
                        videoTitle: video.title,
                        videoDescription: video.description,
                        videoId:id,
                        videoThumbnail:video.thumbnails.medium.url
                      })
                      .then(() => {
                        console.log("Document successfully written!");
                        setButtonText('Course Added!')
                        toggleClass('courseAddedButton')
                      })
                      .catch((error) => {
                        console.error("Error writing document: ", error);
                      });
                }}>{buttonText}</button>
              </div>
            ) : (
              <div style={{ color: "blue" }}>
                <Link to="/Login">
                  You must be logged in to save videos and take notes
                </Link>
              </div>
            )}
          </div>
          <div className="videoDescription">{video.description}</div>
        </>
      )}
    </>
  );
}

export default Player;

