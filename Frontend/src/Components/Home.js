import React, {Component} from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import url from '../serverurl';

class Home extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
                <Navbar />
            </div>
        );
    }
}

export default Home;