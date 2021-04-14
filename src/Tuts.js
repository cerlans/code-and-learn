import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Listings from "./videoListings.js";
function Tuts() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(null);
  function execute() {
    return gapi.client.youtube.search
      .list({
        part: ["snippet"],
        maxResults: 10,
        q: id,
        type: ["video"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          setLoading(false)
          setData(response.result.items); 
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
  useEffect(() => {
    execute();
    setLoading(true);
  }, []);
  return (
    <>
    {isLoading ? (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      ):
   ( <div className='listingParent'>
      {data.map((value) => {
        return (
          <Listings
            videoValue = {value.snippet}
            path = {value.id.videoId}
            title={value.snippet.title}
            url={value.snippet.thumbnails.medium.url}
            channel={value.snippet.channelTitle}
            key={value.etag}
          />
        );
      })}
    
      </div>
   )}
    </>
  );
}

export default Tuts;