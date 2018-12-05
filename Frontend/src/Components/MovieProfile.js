import React from 'react';
import YouTube from 'react-youtube';
import swal from 'sweetalert';
import Navbar from './Navbar';
import url from '../serverurl';
class MovieProfile extends React.Component {

    constructor(){


        super();
        this.state={
            name:"thissssss",
            id:"0KGP9f3duEg",
            youtubeId:"",
            result:"",
            data:""

        };

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
    }





    handleClick=(event)=>{




        console.log("clicked the video")
        if(this.state.name=="thissssss"){
             event.target.pauseVideo();
            swal("Cant play video", "please pay and play", "warning");

        }

    }
    _onReady(event) {
        // access to player in all event handlers via event.target


             event.target.pauseVideo();
    }



    render() {
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
            <div>
            <h1>Movie ID:</h1> {this.state.data.movieid}
            <h1>Movie Name:</h1> {this.state.data.title}
            <h1>Movie Actors:</h1> {this.state.data.actors}
            <h1>Movie Director:</h1> {this.state.data.director}
            <h1>Movie Availability:</h1> {this.state.data.availability}
            <h1>Movie Year:</h1> {this.state.data.year}
            <h1>Movie rating:</h1> {this.state.data.rating}
            <h1>Movie Studio:</h1> {this.state.data.studio}

            <h1>Movie Synopsis:</h1> {this.state.data.synopsis}

            <h1>Movie Country:</h1> {this.state.data.country}
            <h1>Movie Price:</h1> {this.state.data.price}
            </div>

            <YouTube
                videoId={this.state.youtubeId}
                opts={opts}
                onReady={this._onReady}
                onPlay={this.handleClick}
            />
        </div>
    );

}

    }



}

export default MovieProfile;