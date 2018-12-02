import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import AddEditMovie from './AddEditMovie.js'
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import MainHome from './MainHome.js';

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
                </div>
        )
    }
}

//Export The Main Component
export default Main;