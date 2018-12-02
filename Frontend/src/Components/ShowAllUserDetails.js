import React, {Component} from 'react';
import '../App.css';


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
        <div id="img" style={{backgroundColor: "black"}}>
        <div className="login-form" >
            <div id="signup">
                <div className="form-group">
                    <input  type="text"  onChange={this.handleChange} className="form-control" name="SearchUser"
                           placeholder="Search User" required autoFocus/>
                </div>
                    <input style={{backgroundColor : "red"}} type="submit" class="btn btn-primary" onClick={this.SearchUserClick} value="Submit" />

                </div>

            </div>

        <table className="show-user">
                   <tr>
                       <td>User ID</td>

                       <td>User Name</td>
                       <td>Email</td>
                       <td>Subscription</td>
                       <td>Activated</td>

                   </tr>
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

            })}</tbody>
        </table>

        </div>
    )
}


    }
}

export default ShowAllUserDetails;