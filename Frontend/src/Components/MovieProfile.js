import React from 'react';
import YouTube from 'react-youtube';
import swal from 'sweetalert';
import Navbar from './Navbar';
import url from '../serverurl';
import '../css/movieprofile.css';
import axios from 'axios';


class MovieProfile extends React.Component {

    constructor(){
        super();
        this.state={
            name:"thissssss",
            id:"0KGP9f3duEg",
            youtubeId:"",
            result:"",
            data:"",
            type:""
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handlePay = this.handlePay.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }


    componentDidMount() {
        console.log("url parameter",this.props);
        fetch(url+"/movie?movieid=1")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("users from db",result);
                    var n=result.movie.split("=");
                    var Id=n[1];
                    this.setState({
                        isLoaded: true,
                        data: result,
                        youtubeId:Id
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

            axios.get(url + "/checksession")
            .then((response) => {
                if(response.data.status === "SUCCESS"){
                    console.log("inside session", response.data);
                this.setState({
                    type: response.data.type
                })
                }
            }).catch((error) => {
                console.log(error);
            })
    }


    handleAdd(e){
        console.log("in handle Add");
        if(this.state.type === "ADMIN"){
            this.props.history.push('/addEditmovie?movieid',{
                params :{
                 movieID : this.state.data.movieid
                }
             })
        } else {
            swal("You are not allowed to edit the movie", "", "warning")
        }
    }

    handleClick=(event)=>{
        console.log("clicked the video")
         fetch(url+"/play?movieid=1")
            .then(
                (result) => {
                    console.log("play from db",result.body);
                   // if(result.status==200)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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
        this.props.history.push('/payment', {
            params : {
                payType: 'PayPerViewOnly',
                movieID: this.state.data.movieid,
            }
        })
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
             event.target.pauseVideo();
    }



    render() {
        const url='https://youtube.com/embed/'+this.state.youtubeId;
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        console.log("result ")
        if (this.state.data==""){
         return null
    }
    
 else{
    return (
        <div>
            <Navbar />
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
                    <button style={{backgroundColor : "red"}} onClick = {this.handleClick}  class="btn btn-primary"><b>Pay</b></button> 
                    <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item"  src={url}></iframe>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                    <button style={{backgroundColor : "red"}} onClick = {this.handleAdd}  class="btn btn-primary"><b>Add/Edit Movie</b></button> 
                    </div>
                    <div class="col-lg-4">
                    <button style={{backgroundColor : "red"}} onClick = {this.handleRating}  class="btn btn-primary"><b>Rate Movie</b></button> 
                    </div>
                    <div class="col-lg-4">
                    <button style={{backgroundColor : "red"}} onClick = {this.handlePay}  class="btn btn-primary"><b>Pay</b></button> 
                    </div>
                </div>
            </div>
        </div>
    );

}

    }



}

export default MovieProfile;