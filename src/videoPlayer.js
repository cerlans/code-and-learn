import React from 'react';
import { useParams } from "react-router-dom";

function Player(){
    let { id } = useParams();
  console.log(id);
  return (
    <>
     <iframe src={`https://www.youtube.com/embed/${id}`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
        width="640" height="390"
     />
    </>
  )
}

export default Player