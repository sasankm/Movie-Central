import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import AddEditMovie from './AddEditMovie.js'
import Home from './Home.js';
import Login from './Login.js';

//Create a Main Component
class Main extends Component {
    render(){
        return(
                <div>
                    {/*Render Different Component based on Route*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/addEditMovie" component={AddEditMovie}/>
                </div>
        )
    }
}

//Export The Main Component
export default Main;