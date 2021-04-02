import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useParams, Link, useLocation } from "react-router-dom";

function Player() {
  let { id } = useParams();
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLogged, setLogged] = useState(null); 
  let data = useLocation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  });
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
  useEffect(() => {
    execute();
  }, []);

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
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
            />

            {isLogged ? (
              <div>
                <button> Add to your courses</button>
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
// at this point, once the user logs in, the button will contain a function, but what kind off function? 
// a function that has to pass the video link to a seperate component, it seems easy now, but that would mean passing data between components which is something i haven't fully done yet.
// i can use the Link To again, an object, with the video url. The your saved courses will be literally the same as the video player, but note taking is enabled.
// they must be seperate components to allow saved courses functionality, otherwise you can't save anything
// ill reuse the video player component with some extras mixed in
// The link to object seems to easy, and i feel like there might be some problems with it that i can't see yet.
// from that video that was selected, what data do i have to send? the entire data block? i think i'll just send the entire data block off the video that was selected, rather than just the video ID
export default Player;