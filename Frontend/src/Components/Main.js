import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import AddEditMovie from './AddEditMovie.js'
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import MainHome from './MainHome.js';
import ShowUsers from './ShowAllUserDetails.js';
import UserProfile from './UserProfile.js';
import Rating from './Rating/rating.js';

//Create a Main Component
class Main extends Component {
    render(){
        return(
                <div>
                    {/*Render Different Component based on Route*/}
                    <Route path = "/" exact component={MainHome} />
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/home" exact component={Home}/>
                    <Route path="/addEditMovie" exact component={AddEditMovie}/>
                    <Route path="/showusers" exact component={ShowUsers}/>
                    <Route path="/showusers/{userid}" exact component={ShowUsers}/>
                    <Route path="/profile" exact component={UserProfile}/>
                    <Route path="/rating" exact component={Rating}/>
                </div>
        )
    }
}

//Export The Main Component
export default Main;