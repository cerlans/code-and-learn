import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
// i need to do something here with state, the state needs to moph into a corresponding string based on the div that was clicked, do i have to use an onclick for each and every single one?
import firebase from 'firebase/app';
function Topics (){
  const [query,setQuery] = useState('')
  var user = firebase.auth().currentUser;

function loadClient() {
    gapi.client.setApiKey("AIzaSyCFiBdff1JxkTe4F_0auryiuqiYMIJd48g");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.

  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 10,
      "q": query,
      // 'q' well be a template string here and will respond to the div that was clicked, but how do i make an entire div associate with a keyword? its classname? creating a custim 'tag' attribute?
      "type": [
        "video"
      ],
      "videoDuration": "medium"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
gapi.load("client",function(){
    console.log('ive finished loading')
  });
  

  return(
    <>
      <div className='topics-header'>
        <h1>What do you want to learn?</h1>
        {user ? <div>you are signed in</div> : <div> <Link to='/Login'><span className='sign-up'>Sign Up</span></Link> for an account to add tutorials to your subscriptions and take notes!</div>}
      </div>
      <div className='topics-cont'>
        <div className='topics-icons'>
           <div className='topics-card'  style={{background:'#dd4b25'}} >
            <div className='inner'>
            <i class="fab fa-html5" style={{color:'white'}}></i>
            </div> 
            <div className='text'>
            <p>HTML5</p>
            </div>
          </div>
          <div className='topics-card' style={{background:'#254bdd'}} >
            <div className='inner'>
            <i class="fab fa-css3-alt" style={{color:'white'}}></i>
            </div> 
            <div className='text'>
            <p>CSS3</p>
            </div>
          </div>
           <div className='topics-card'  style={{background:'#efd81d'}}>
            <div className='inner'>
            <i class="fab fa-js" ></i>
            </div> 
            <div className='text'>
            <p>Javascript (ES6)</p>
            </div>
          </div>
           <div className='topics-card'  style={{background:'#41b883'}}>
            <div className='inner'>
            <i class="fab fa-vuejs"></i>
            </div> 
            <div className='text'>
            <p>Vue.Js</p>
            </div>
          </div>
           <div className='topics-card' style={{background:'#5ed3f3'}}>
            <div className='inner'>
            <i class="fab fa-react"></i>
            </div> 
            <div className='text'>
            <p>React.Js</p>
            </div>
          </div>
           <div className='topics-card' style={{background:'#8cbf3d'}}>
            <div className='inner'>
            <i class="fab fa-node-js"></i>
            </div> 
            <div className='text'>
            <p>Node.Js</p>
            </div>
          </div>
           <div className='topics-card' style={{background:'#4584b6'}}>
            <div className='inner'>
            <i class="fab fa-python" style={{color:'white'}}></i>
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