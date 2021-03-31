import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Player(){
    let { id } = useParams();
    const [description,setDescription] = useState('')
  console.log(id);
    function execute() {
    return gapi.client.youtube.videos.list({
      "part": [
        "snippet,contentDetails,statistics"
      ],
      "id": [
        id
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response.result.items[0].snippet.description);
                setDescription(response.result.items[0].snippet.description)
              },
              function(err) { console.error("Execute error", err); });
  }
  useEffect(()=>{
    execute()
  },[])

  return (
    <>
    <div className='iframePanel'>
     <iframe src={`https://www.youtube.com/embed/${id}`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
        width="640" height="390"
     />
     </div>
     <div className='videoDescription'>
     {JSON.stringify(description, null, "\n")}
     </div>
    </>
  )
}

export default Player