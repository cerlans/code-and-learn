import React from "react";
import {Link} from "react-router-dom";
import About from './About.js'
import Login from './Login.js'
import Home from './Home.js'
import Topics from './Topics.js'
import { BrowserRouter,Switch,Route,Link,useHistory} from "react-router-dom";
function Content() {
  
  return (
    <>
      <div className="master">
        <div className="sidebar">
          <ul>
            <Link to="/"><li><i class="fas fa-home"></i>Home</li></Link>
            <Link to="/About"><li><i class="far fa-address-card"></i>About</li></Link>
            <Link to="/Topics"><li> <i class="fas fa-book-open"></i>Topics</li></Link>
            <Link to='/Login'><li><i class="fas fa-users"></i> Login</li></Link>
          </ul>
        </div>
        <div className="information-view">
          <Route exact path ='/'>
            <Home/>
          </Route>
          <Route  path="/About">
            <About/>
          </Route>
          <Route path='/Login'>
            <Login/>
          </Route>
           <Route path='/Topics'>
            <Topics/>
          </Route>
        </div>
      </div>
    </>
  );
}
export default Content;
