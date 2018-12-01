import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import AddEditMovie from './AddEditMovie.js'
import Home from './Home.js'
import ShowUsers from './ShowAllUserDetails.js';

//Create a Main Component
class Main extends Component {
    render(){
        return(
                <div>
                    {/*Render Different Component based on Route*/}
                    <Route path="/home" component={Home}/>
                    <Route path="/addEditMovie" component={AddEditMovie}/>
                    <Route path="/showusers" component={ShowUsers}/>
                    <Route path="/showusers/{userid}" component={ShowUsers}/>
                </div>
        )
    }
}

//Export The Main Component
export default Main;