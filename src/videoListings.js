import React, { useState } from 'react';
import {Link} from 'react-router-dom'

function Listings(props){
  return(
    <>
    <Link to = {{
      pathname:`/Topics/Video/${props.path}`,
      state:props.videoValue
    }}>
    <div className='videoListing'>
      <div className='thumbnail'>
        <img src ={props.url}/>
      </div>
      <div className='content'>
        <h4>{props.title}</h4>
        <p>{props.channel}</p>
      </div>
    </div>
    </Link>
    </>
  )
}

export default Listings