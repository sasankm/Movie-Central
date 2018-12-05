import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Navbar from './Navbar'
import '../css/login.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import swal from 'sweetalert';
import axios from 'axios';
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


    submitPayment = () => {
        // some action...
        // then redirect
       // this.setState({redirect: true});
        /*
        var expdate;
        var date;
        var today = new Date();
        var d;
        if(today.getDate()>9){

            d=today.getDate();
        }
        else{
            d='0'+today.getDate();
        }*/
        //var sdate="";
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + d;
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + d;
        /*
        if (this.state.datafromUserProfile.subscription==0){

         sdate=date;


        console.log("In Side Payment handle Submit",date);
        var expirymonth;
        var expiryyear=today.getFullYear();
        console.log("expiry date initialised to present",expiryyear);
        var expiryday;
       console.log("(today.getMonth()+1 + this.state.datafromUserProfile.selectedMonth)",(today.getMonth()+1 + this.state.datafromUserProfile.selectedMonth));
        console.log("type of this.state.datafromUserProfile.selectedMonth ",typeof this.state.datafromUserProfile.selectedMonth)

       if ((today.getMonth()+1 + parseInt(this.state.datafromUserProfile.selectedMonth))>12){
           expirymonth=(today.getMonth()+1 + parseInt(this.state.datafromUserProfile.selectedMonth))-12;
           if (expirymonth<10){
               expirymonth='0'+expirymonth;
           }
           expiryyear+=1;
          // expirydate=expiryyear+'-'+expirymonth+'-'+d;
       }
       else{
           expirymonth=today.getMonth()+1;

           //expirydate=today.getFullYear() + '-' + (today.getMonth() + 1)+ this.state.datafromUserProfile.selectedMonth+ '-' + d;
       }
        var day = new Date(expiryyear, expirymonth + 1, 0);
       console.log("day is ",day);
        if (d>day){

            expiryday=day;


        }
        else{
            expiryday=d;


        }
        expdate=expiryyear+'-'+expirymonth+'-'+expiryday;

        console.log("expiry date is ",expdate)


        }

        else{
           var userenddate=this.state.datafromUserProfile.enddate;
           var datesplit=userenddate.split("-")
            var month=parseInt(datesplit[1])
            var year=parseInt(datesplit[0])
            var day1=parseInt(datesplit[2])+1
            var expday;
           var expmonth;
           var expyear=year;

           console.log("user subscription end date split ",year,month,day1)

            if ((month + parseInt(this.state.datafromUserProfile.selectedMonth))>12){
                expmonth=(month + parseInt(this.state.datafromUserProfile.selectedMonth))-12;
                if (expmonth<10){
                    expmonth='0'+expmonth;
                }
                expyear=year+1;
                // expirydate=expiryyear+'-'+expirymonth+'-'+d;
            }
            else{
                expmonth=month+parseInt(this.state.datafromUserProfile.selectedMonth);
                if (expmonth<10){
                    expmonth='0'+expmonth;
                }
                //expirydate=today.getFullYear() + '-' + (today.getMonth() + 1)+ this.state.datafromUserProfile.selectedMonth+ '-' + d;
            }
            var day2 = new Date(expyear, parseInt(expmonth) + 1, 0);
           //console.log("day2 is ",day2)
           console.log("expiry month +1 ",expmonth + 1);
            console.log("day is ",day2);
            if (day1>day2){

                expday=day2;
                if (expday<10){
                    expday='0'+expday;
                }

            }
            else{
                expday=day1;
                if (expday<10){
                    expday='0'+expday;
                }


            }
            expdate=expyear+'-'+expmonth+'-'+expday;
           // this.state.setState({expirydate:expdate});
            console.log("expiry date if subcription =1  is  ",expdate)

        }
*/
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
        axios.post("http://localhost:8080" + '/payment/?type=subscription', payment)
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
        console.log("details from prev page",this.state.datafromUserProfile.userid);
        return(
            <div style={{backgroundColor: "black"}}>
                <Navbar/>
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