import React, {Component} from 'react';
import '../css/showAllUserDetails.css';
import Navbar from './Navbar.js';


class ShowAllUserDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
            user:""

        };
        this.handleChange=this.handleChange.bind(this);
        this.SearchUserClick=this.SearchUserClick.bind(this);
    }
    componentDidMount() {
        console.log("url parameter",this.props);
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
            <Navbar />
            <div class="user-form" >
                <div id="user-details">
                <h3 id="search">Search for User.</h3>
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
                    <tr key = {key}>
                        <td>{item.userid}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.subscription}</td>
                        <td>{item.activated}</td>
                    </tr>
                )
            })
            }
            </tbody>
        </table>

        </div>
    )
}


    }
}

export default ShowAllUserDetails;