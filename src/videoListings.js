import React, { useState } from 'react';


function Listings(props){
  return(
    <>
    <div className='videoListing'>
      <div className='thumbnail'>
        <img src ={props.url}/>
      </div>
      <div className='content'>
        <h4>{props.title}</h4>
        <p>{props.channel}</p>
      </div>
    </div>
    </>
  )
}

export default Listings