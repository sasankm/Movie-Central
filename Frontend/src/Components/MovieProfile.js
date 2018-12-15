import React from 'react';
import YouTube from 'react-youtube';
import swal from 'sweetalert';
import Navbar from './Navbar';
import url from '../serverurl';
import '../css/movieprofile.css';
import axios from 'axios';
import queryString from 'query-string'


class MovieProfile extends React.Component {

    constructor(){
        super();
        this.state={
            name:"thissssss",
            id:"0KGP9f3duEg",
            youtubeId:"",
            result:"",
            data:"",
            type:null,
            flag: false,
            movieid :null
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handlePay = this.handlePay.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }


    componentDidMount() {

        axios.get(url + "/checksession", {headers : { Authorization : localStorage.getItem("sessionID") }})
                .then((response) => {
                    console.log("in check session of navbar", response.data);
                    if(response.data.message === "invalid session"){ 
                        this.props.history.push("/login");
                    } else {
                        console.log("Type of Person",response.data.type);
                        this.setState({type : response.data.type});
                    }
                })

        

        console.log("Movie ID received",this.props.match.params.id);
        this.setState({
            movieid : this.props.match.params.id
        },()=>{
            console.log("url parameter",this.props);
        fetch(url+"/movie?movieid="+this.state.movieid)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("users from db",result);
                    var n=result.movie.split("=");
                    var Id=n[1];
                    this.setState({
                        isLoaded: true,
                        data: result,
                        youtubeId:Id,
                        flag: false,

                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        })


        
    }


    handleAdd(e){
        console.log("in handle Add", this.state.data.movieid);
        if(this.state.type === "ADMIN"){
            this.props.history.push('/addEditmovie/'+this.state.data.movieid)
        } else {
            swal("You are not allowed to edit the movie", "", "warning")
        }
    }

    handleClick=(event)=>{
        console.log("clicked the video")
        var params=queryString.parse(this.props.location.search);
       // localStorage.setItem("movieid",queryString.parse(this.props.location.search).movieid);
        var request = {

            headers : {
                Authorization : localStorage.sessionID
            }
        };
        console.log("movie id in movie profile",params)
         fetch(url+"/play?movieid=" + this.state.movieid ,request) //change after search
         .then(response=>response.json())
            .then(
                (result) => {
                    console.log("play from db",result);
                   if(result.status=="SUCCESS"){
                       this.setState({
                           flag: true
                       })
                   } else if(result.message === "invalid session"){
                       swal("You did not logged in! Please login", "", "warning")
                       this.props.history.push('/login');
                   }else {
                       swal(result.message, "", "warning")
                   }
                },
                (error) => {
                    console.log("error from play",error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
    handleRating(e){
        console.log("in handle rating");
        this.props.history.push('/rating', {
            params :{
                movieID : this.state.data.movieid
               }
        })
    }

    handlePay(e){
        console.log("inside handle pay");
        
        this.props.history.push('/payment?movieid=' +  queryString.parse(this.props.location.search).movieid, {
            params : {
                payType: 'PayPerViewOnly',
                movieID: queryString.parse(this.props.location.search).movieid,
            }
        })
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
             event.target.pauseVideo();
    }



    render() {

        let changes =null;



        let add_edit_movie=null;
        let rate_movie=null;
        let pay=null;

        if(this.state.type==="ADMIN"){
            add_edit_movie=(
               <div class="col-lg-4">
               <button style={{backgroundColor : "red"}} onClick = {this.handleAdd}  class="btn btn-primary"><b>Add/Edit Movie</b></button> 
               </div>
            );
        }

        if(this.state.type==="USER"){
           rate_movie=(
               <div class="col-lg-4">
               <button style={{backgroundColor : "red"}} onClick = {this.handleRating}  class="btn btn-primary"><b>Rate Movie</b></button> 
               </div>
           )

           pay=(
               <div class="col-lg-4">
               <button style={{backgroundColor : "red"}} onClick = {this.handlePay}  class="btn btn-primary"><b>Pay</b></button> 
               </div>
           )
        }

        const url='https://youtube.com/embed/'+this.state.youtubeId;
        console.log("flag is ",this.state.flag)
        if(this.state.flag){
            console.log("hehre", url)
            changes = (
                <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item"  src={url}></iframe>
            </div>
            );
        } else {
            changes = (
                <button style={{backgroundColor : "red"}} onClick = {this.handleClick}  class="btn btn-primary"><b>Watch</b></button> 
            );
        }
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        console.log("result ")
        if (this.state.data==""){
         return null;
        }
        else{
            return (
                <div>
                    <Navbar history={this.props.history}/>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-5">
                            <table className="table table-hover" id="table2">
                                <thead>
                                    <tr className='table-secondary'>
                                        <th>About Movie</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Movie ID:</td>
                                        <td>{this.state.data.movieid}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Name:</td>
                                        <td>{this.state.data.title}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Actors:</td>
                                        <td>{this.state.data.actors}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Director:</td>
                                        <td>{this.state.data.director}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Year:</td>
                                        <td>{this.state.data.year}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie rating:</td>
                                        <td>{this.state.data.rating}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Studio:</td>
                                        <td>{this.state.data.studio}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Synopsis:</td>
                                        <td>{this.state.data.synopsis}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Country:</td>
                                        <td>{this.state.data.country}</td>
                                    </tr>
                                    <tr>
                                        <td>Movie Price:</td>
                                        <td>{this.state.data.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="col-lg-6">
                            {changes}
                            </div>
                        </div>
                        <div class="row">
                        
                        {add_edit_movie}
                        {rate_movie}
                        {pay}
                        </div>
                    </div>
                </div>
        )};
}}

export default MovieProfile;