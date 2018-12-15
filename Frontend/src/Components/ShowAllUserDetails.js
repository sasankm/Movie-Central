import React, {Component} from 'react';
import '../css/showAllUserDetails.css';
import Navbar from './Navbar.js';
import axios from 'axios';
import url from '../serverurl';


class ShowAllUserDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
            user:"",
            searchIncomplete:""
        };
        this.handleChange=this.handleChange.bind(this);
        this.SearchUserClick=this.SearchUserClick.bind(this);
    }
    componentDidMount() {
        console.log("url parameter",this.props);

        console.log("localstorage in showusers ",localStorage);
        fetch("http://localhost:8080/user")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("users from db",result);
                    this.setState({
                        isLoaded: true,
                        data: result
                    });

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    SearchUserClick(){
        console.log("user id is",this.state.user)
        fetch("http://localhost:8080/user/"+this.state.user)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("user from db",result);
                    if(result.length>0){
                        this.setState({
                            isLoaded: true,
                            data: result,
                            searchIncomplete: ""
                        });
                    }else{
                        this.setState({
                            searchIncomplete : "Kindly enter the exact entire User Name!!!"
                        })
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    showUserProfile(data){
        console.log("in user profile click", data);
        axios.get(url+ "/user/"+ data.username)
        .then((response) => {
            console.log(response.data);
            this.props.history.push('/profile?username=' + data.username);
        }, (error)=>{
            alert("baahhhhh");
        })
    }

    handleChange=(e)=>{
        console.log("event",e.target.value);
        this.setState({user: e.target.value});
    }


    render() {
      if (this.state.data==undefined){
          return null;
        }
        else{
            return (
            <div>
            <Navbar history={this.props.history}/>
            <div class="user-form" >
                <div id="user-details">
                <h3 id="search">Search for User.</h3>
                <h4 style={{color : "red"}}>{this.state.searchIncomplete}</h4>
                    <div class="form-group">
                        <input  type="text"  onChange={this.handleChange} class="form-control" name="SearchUser"
                           placeholder="Search User" required autoFocus/>
                    </div>
                        <input style={{backgroundColor : "red"}} type="submit" class="btn btn-primary" onClick={this.SearchUserClick} value="Submit" />
                </div>
            </div>
        <table className="table table-hover" id="table"> 
        <thead>
                    <tr className='table-secondary'>
                       <th>User ID</th>
                       <th>User Name</th>
                       <th>Email</th>
                       <th>Subscription</th>
                       <th>Activated</th>
                   </tr>
        </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key} onClick={() => {this.showUserProfile(item)}}>
                        <td>{item.userid}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.subscription}</td>
                        <td>{item.activated}</td>
                    </tr>
                )
            }.bind(this))
            }
            </tbody>
        </table>

        </div>
    )
}


    }
}

export default ShowAllUserDetails;