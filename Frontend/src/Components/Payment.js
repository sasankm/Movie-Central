import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar'
import '../css/login.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import swal from 'sweetalert';
import axios from 'axios';
import url from '../serverurl';
class Payment extends Component{

    constructor(props){
        super(props);

        this.state = {
            data:[],
            name:"",
            card:"",
            expirydate:"",
            cvv:"",
            datafromUserProfile:this.props.location.state && this.props.location.state.referrer,
            message: "",
            expirydate:"",

        }

        var t=new Date();
        console.log("todays date",t.getDate())
        console.log("todays month",t.getMonth())
        console.log("todays year",t.getFullYear())
    }

    componentWillMount(){
        //check session
    }
    nameChangeHandler=(e)=>{
        this.setState({
            name : e.target.value
        })
    }
    cardChangeHandler=(e)=>{
        this.setState({
            card : e.target.value
        })
    }
    expiryChangeHandler=(e)=>{
        this.setState({
            expiry : e.target.value
        })
    }
    cvvChangeHandler=(e)=>{
        this.setState({
            cvv : e.target.value
        })
    }


    componentDidMount(){

    var self = this;
    axios.get(url + "/checksession", {headers : { Authorization :  localStorage.getItem("sessionID")}})
.then((response) => {
    console.log("In check session of showalluserdetails page: ", response.data);
    this.setState({type:response.data.type})
    if(response.data.message != "valid session"){
        swal("Invalid session please login", "", "warning");
        self.props.history.push('/login');
    }

})
}

    submitPayment = () => {

        var payment = {
            userid: this.state.datafromUserProfile.userid,
            movieid: this.state.datafromUserProfile.movieid,
            //type: this.state.datafromUserProfile.type,
            //date:date,
            amount:this.state.datafromUserProfile.amount,
            username:this.state.datafromUserProfile.username,
            selectedMonth:this.state.datafromUserProfile.selectedMonth,
            //expirydate:expdate,
           // startdate:sdate


        }
       console.log("payment in from end is",payment);
        axios.post(url + '/payment/?type=subscription', payment)
            .then((response) => {
                console.log("response from payment",response.data);
                if(response.data.status == "SUCCESS"){
                    swal("Payment Successfull","", "success");
                    this.setState({
                        message: response.data.message,
                    }, () =>{
                        this.props.history.push("/profile");
                    })
                } else {
                    swal(response.data.message, "", "warning");
                }
            })

    }

    render(){
        if (this.state.redirect==true) {
            return <Redirect push to="/showusers" />;
        }
        //console.log("details from prev page",this.state.datafromUserProfile.userid);
        return(
            <div style={{backgroundColor: "black"}}>
                <Navbar history={this.props.history}/>
                <div id="img">
                    <div class="container">
                        <h1 style={{color : "red"}}>Payment</h1>
                        <div class="login-form">
                            <div id="signup">
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="title" placeholder="Name on card" required/>
                                </div>
                                <div className="form-group ">
                                    <input onChange={this.cardChangeHandler} type="text" className="form-control"
                                           name="genre" placeholder="Card Number" required/>
                                </div>
                                <div class="form-group ">
                                    <input onChange = {this.expiryChangeHandler} type="text" class="form-control"  name="genre" placeholder="MM/YY" required/>
                                </div>

                                <div class="form-group ">
                                    <input onChange = {this.cvvChangeHandler} type="text" class="form-control"  name="studioName" placeholder="CVV" required/>
                                </div>
                                <button style={{backgroundColor : "red"}} onClick = {this.submitPayment}  class="btn btn-primary"><b>Pay</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;