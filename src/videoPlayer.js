import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useParams, Link, useLocation } from "react-router-dom";

function Player() {
  let { id } = useParams();
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogged] = useState(null);
  let data = useLocation();

  var db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

          setDescription(response.result.items[0].snippet);
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
            <h1>{` '${description.title}' by ${description.channelTitle}`}</h1>
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title="video"
            />
            {isLogged ? (
              <div>
                <button className="addCourseButton" onClick={()=>{
                   db.collection(`Users/${user.uid}/SavedVideos`)
                    .add({
                        name: "Formula 1",
                        state: "CReubT",
                        country: "United States OF America",
                      })
                      .then(() => {
                        console.log("Document successfully written!");
                      })
                      .catch((error) => {
                        console.error("Error writing document: ", error);
                      });
                }}>Add to your courses</button>
              </div>
            ) : (
              <div style={{ color: "blue" }}>
                <Link to="/Login">
                  You must be logged in to save videos and take notes
                </Link>
              </div>
            )}
          </div>
          <div className="videoDescription">{description.description}</div>
        </>
      )}
    </>
  );
}

export default Player;

/* 
   db.collection(`Users/${user.uid}/SavedVideos`)
                    .add({
                        name: "Formula 1",
                        state: "CReubT",
                        country: "United States OF America",
                      })
                      .then(() => {
                        console.log("Document successfully written!");
                      })
                      .catch((error) => {
                        console.error("Error writing document: ", error);
                      });
*/