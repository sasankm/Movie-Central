import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import AddEditMovie from './AddEditMovie.js'
//import Home from './Home.js';
//import Login from './Login.js';
import Signup from './Signup.js';
import MainHome from './MainHome.js';
import Home from './Home.js'
import ShowUsers from './ShowAllUserDetails.js';

import Login from './Login.js';
import UserProfile from './UserProfile.js';
import Payment from './Payment.js';
//Create a Main Component
class Main extends Component {
    render(){
        return(
                <div>
                    {/*Render Different Component based on Route*/}
                    <Route path = "/" component={MainHome} />
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup} />
                    <Route path="/home" component={Home}/>
                    <Route path="/addEditMovie" component={AddEditMovie}/>
                    <Route path="/showusers" component={ShowUsers}/>
                    <Route path="/showusers/{userid}" component={ShowUsers}/>
                    <Route path="/profile" component={UserProfile}/>
                    <Route path="/payment" component={Payment}/>
                </div>
        )
    }
}

//Export The Main Component
export default Main;