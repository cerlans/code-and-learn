import React, { useState } from "react";


function Test(props){
  return(
    <>
    <div className='container'>
      <div className='thumbnail'>
        <img src ={props.url}/>
      </div>
      <div className='content'>
        <h1>{props.title}</h1>
        <p>{props.channel}</p>
      </div>
    </div>
    </>
  )
}


export default Test