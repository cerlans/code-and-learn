import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Player(){
    let { id } = useParams();
    const [description,setDescription] = useState('');
    const [isLoading, setLoading] = useState(true);

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
                
                setDescription(response.result.items[0].snippet)
                setLoading(false)
              },
              function(err) { 
                console.error("Execute error", err);
                setLoading(false)
                 });
  }
  useEffect(()=>{
    execute()
  },[])

  return (
    <>
   {isLoading ? (<div className="loader-parent">
                  <div className="loader"></div>
        </div>)
        :
        <>  
        <div className='iframePanel'>
     <h1>{` '${description.title}' by ${description.channelTitle}`}</h1>
     <iframe src={`https://www.youtube.com/embed/${id}`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
     />
     </div>
     <div className='videoDescription'>
     {description.description}
     </div> 
     </>}
    </>
  )
}

export default Player