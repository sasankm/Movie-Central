import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar'
import '../css/login.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class UserProfile extends Component{

    constructor(props){
        super(props);

        this.state = {
         data:[],
            username:"",
            userid:"",
            email:"",
            enddate:"",
            suscription:"",
            redirect:"",
            amount:10,
            options : [

                { value: '1', label: '1 month' },
                { value: '2', label: '2 months' },
                { value: '3', label: '3 months' },
                { value: '4', label: '4 months' },
                { value: '5', label: '5 months' },
                { value: '6', label: '6 months' },
                { value: '7', label: '7 months' },
                { value: '8', label: '8 months' },
                { value: '9', label: '9 months' },
                { value: '10', label: '10 months' },
                { value: '11', label: '11 months' },
                { value: '12', label: '12 months' }

            ],

            selectedMonth:"1 month",
            movieid:"",
            type:"subscription"


        }
        this.changeMonth=this.changeMonth.bind(this);
        this.handleOnClick=this.handleOnClick.bind(this);

    }

    componentWillMount(){
        //check session
    }

    componentDidMount() {
        console.log("url parameter",this.props);

        fetch("http://localhost:8080/user/venkat")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("data for user profile",result)
                    this.setState({
                        isLoaded: true,
                        username:result[0].username,
                        userid:result[0].userid,
                        email:result[0].email,
                        subscription:result[0].subscription,
                        enddate:result[0].enddate

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
    changeMonth=(e)=>{
        console.log("event is",e);
        this.setState({
            selectedMonth:e.value,
            amount:10*parseInt(e.value)
        })
    }

    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({redirect: true});
    }

    render(){
        if (this.state.redirect==true) {
            return <Redirect to={{pathname:"/payment",state:{referrer:this.state}}} />;
        }
        console.log(" selected month is",this.state.selectedMonth);
        return(

            <div style={{backgroundColor: "black"}} >

                <div id="img" class="container">
                    <div >
                        <div class="login-form">
                            <div id="login">
                                <h1>Profile</h1>
                                &nbsp;


                                <form class="form" onSubmit={this.handleOnClick}>
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
                                        <input value={this.state.subscription} type="text" class="form-control" name="title"  required autoFocus/>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div class="form-group">
                                        <label>End Date</label>
                                        <input value={this.state.enddate} type="text" class="form-control" name="title"  required autoFocus/>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="form-group">
                                        <label>Select payment period</label>
                                    <Dropdown options={this.state.options}  onChange={this.changeMonth}  value={this.state.selectedMonth} placeholder="Select an option" />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount to be paid</label>
                                        <input value={this.state.amount} type="text" className="form-control"
                                               name="title" required autoFocus/>
                                    </div>

                                    &nbsp;&nbsp;&nbsp;
                                    &nbsp;
                                    <button style={{backgroundColor : "red"}} onClick = {this.handleOnClick}  class="btn btn-primary"><b>Make Payment</b></button>
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