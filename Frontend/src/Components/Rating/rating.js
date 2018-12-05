import './rating.css'
import React, {Component} from 'react';
import {Form,FormGroup,Col,ControlLabel,Checkbox,Button,FormControl} from 'react-bootstrap/lib';
import TextareaAutosize from 'react-textarea-autosize';
import Navbar from '../Navbar.js';
import axios from 'axios'

//Define a Review Component
class Rating extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = { 
            movieID     :   1,
            userID      :   3,
            rating      :   null,
            movieComment:   ''
        };
    }


    componentDidMount=()=>{
        //Here we will set the state to the values received from other component.
    }

    ratingChangeHandler=(e)=>{
        console.log(e.target.value);
        this.setState({
            rating : e.target.value
        })
    }

    reviewCommentChangeHandler=(e)=>{
        console.log(e.target.value);
        this.setState({
            movieComment : e.target.value
        })
    }

    submitRating=()=>{
        const ratingDetails={
            movieID     :   this.state.movieID,
            userID      :   this.state.userID,
            rating      :   this.state.rating,
            movieComment:   this.state.movieComment
        }
        console.log("Displaying State",ratingDetails);

        axios.post("http://localhost:8080/add-review",ratingDetails)
            .then(response => {
                if(response.data.status === 200){
                    console.log("Received success from the backend after successfully inserting the rating for the movie")
                    this.setState({
                        success : "You have successfully rated the movie!!!!"
                    })
                }else{
                    console.log("entered into failure")
                }
            }).catch(err=>{
                console.log("Inside catch block of submitRating",err);
            })
    }

    render(){
        const { country, region } = this.state;
        const addEdit= (this.state.title==undefined || this.state.title==null) ? "Add a" : "Edit the"
        return(
            <div style={{backgroundColor : "black"}}>
                <Navbar/>
                <div id="ratingImage">
                            <div style={{paddingLeft : "30%",paddingBottom : "3%"}}>
                                <img style={{width: "30%" , display: "block"}} src={require('../netflix_logo.png')} alt="Kaye naye display karle!"/>
                            </div>
                            <h2 style={{paddingLeft : "30%", color: "white"}}>REVIEWS</h2>
                            <br/><br/>
                            <span style={{paddingLeft : "30%", color: "white"}}><b>Rating(0-5)</b></span>

                            <div style={{paddingLeft : "29%"}}>
                                <div class="form-group name1 col-md-2"><input value={this.state.rating}  onChange={(e) => this.ratingChangeHandler(e)} 
                                class="form-control" type="number" max="5" min="0" step="1" style={{paddingLeft : "30%"}}/>
                                </div>
                            </div>

                            <br/><br/><br/> <br/>

                            <span style={{paddingLeft : "30%", color: "white"}}><b>Review Comments(optional)</b></span>

                            <div style={{paddingLeft : "30%"}}>
                                <TextareaAutosize
                                style={{width : "60%"}}
                                minRows={7}
                                maxRows={10}
                                defaultValue="Your reviews on movie please......."
                                onChange={(e) => this.reviewCommentChangeHandler(e)} 
                                />
                            </div>

                            <br/><br/>

                            <div  style={{paddingLeft : "30%", paddingBottom : "5%"}}>
                                <Button type="submit" btn btn-primary onClick = {this.submitRating} >Submit</Button>
                            </div>

                            <img style={{width: "100%" , display: "block"}} src={require('../Netflix_Footer.png')} alt="Kaye naye display karle!"/>
                        
                </div>
            </div>
        )
    }
}


//export AddMovie Component
export default Rating;