import React, { useState,useEffect,useRef } from 'react';
import Test from './Test.js'
import {useParams} from 'react-router-dom'
function Tuts(){
   let { id } = useParams();
   const [data,setData] = useState([])
   
    function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 10,
      "q": id,
      "type": [
        "video"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                setData(response.result.items)
              },
              function(err) { console.error("Execute error", err); });
  }
  return (
    <>
      <h1>Testing</h1>
      {data.map(function(value){
       console.log(value)
      })}
    </>
  )
}


export default Tuts

