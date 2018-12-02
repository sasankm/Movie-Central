import React, {Component} from 'react';
import Navbar from './Navbar'
import '../css/login.css';


class UserProfile extends Component{

    constructor(props){
        super(props);

        this.state = {
         data:[],
            username:"",
            userid:"",
            email:"",
            enddate:"",
            suscription:""


        }

    }

    componentWillMount(){
        //check session
    }

    componentDidMount() {
        console.log("url parameter",this.props);

        fetch("http://localhost:8080/user/10")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("data for user profile",result[0].username)
                    this.setState({
                        isLoaded: true,
                        username:result[0].username,
                        userid:result[0].userid,
                        email:result[0].email,
                        subscription:result[0].subscription,
                        enddate:result[0].username.enddate

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



    render(){
        return(
            <div style={{backgroundColor: "black"}} >

                <div id="img" class="container">
                    <div >
                        <div class="login-form">
                            <div id="login">
                                <h1>Profile</h1>
                                &nbsp;


                                <form class="form" onSubmit={this.handleLogin}>
                                    <div class="form-group">

                                        <label>User ID</label> <input  value={this.state.userid} type="text" class="form-control" name="title"  autoFocus/>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div class="form-group">
                                        <label>User Name</label>

                                        <input value={this.state.username}  type="text" class="form-control" name="title"  autoFocus/>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input value={this.state.email}  type="text" class="form-control" name="title"  required autoFocus/>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div class="form-group">
                                        <label>Subscription</label>
                                        <input value={this.state.suscription} type="text" class="form-control" name="title"  required autoFocus/>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div class="form-group">
                                        <label>End Date</label>
                                        <input value={this.state.enddate} type="text" class="form-control" name="title"  required autoFocus/>
                                    </div>


                                    &nbsp;&nbsp;&nbsp;
                                    &nbsp;
                                    <button style={{backgroundColor : "red"}} onClick = {this.handleLogin}  class="btn btn-primary"><b>Make Payment</b></button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;