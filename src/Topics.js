import React, { useState } from "react";
import { Link } from "react-router-dom";

import firebase from 'firebase/app';
function Topics (){
  //line 9 will be a conditional that will only display if the user isn't logged in.
   var user = firebase.auth().currentUser;
  console.log(user)
  return(
    <>
      <div className='topics-header'>
        <h1>What do you want to learn?</h1>
        {user ? <div>you are signed in</div> : <div> <Link to='/Login'><span className='sign-up'>Sign Up</span></Link> for an account to add tutorials to your subscriptions and take notes!</div>}
      </div>
      <div className='topics-cont'>
        <div className='topics-icons'>
           <div className='topics-card' onClick={()=>console.log(user)}>
            <div className='inner'>
            <i class="fab fa-html5"></i>
            </div> 
            <div className='text'>
            <p>HTML5</p>
            </div>
          </div>
          <div className='topics-card'>
            <div className='inner'>
            <i class="fab fa-css3-alt"></i>
            </div> 
            <div className='text'>
            <p>CSS3</p>
            </div>
          </div>
           <div className='topics-card'>
            <div className='inner'>
            <i class="fab fa-js"></i>
            </div> 
            <div className='text'>
            <p>Javascript (ES6)</p>
            </div>
          </div>
           <div className='topics-card'>
            <div className='inner'>
            <i class="fab fa-vuejs"></i>
            </div> 
            <div className='text'>
            <p>Vue.Js</p>
            </div>
          </div>
           <div className='topics-card'>
            <div className='inner'>
            <i class="fab fa-react"></i>
            </div> 
            <div className='text'>
            <p>React.Js</p>
            </div>
          </div>
           <div className='topics-card'>
            <div className='inner'>
            <i class="fab fa-node-js"></i>
            </div> 
            <div className='text'>
            <p>Node.Js</p>
            </div>
          </div>
           <div className='topics-card'>
            <div className='inner'>
            <i class="fab fa-python"></i>
            </div> 
            <div className='text'>
            <p>Python</p>
            </div>
          </div>
        </div>
       </div>
    </>
  )
}


export default Topics