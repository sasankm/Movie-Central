import React from 'react';
import YouTube from 'react-youtube';
import swal from 'sweetalert';
import Navbar from './Navbar'
class MovieProfile extends React.Component {

    constructor(){


        super();
        this.state={
            name:"thissssss",
            id:"0KGP9f3duEg"

        };

        this.handleClick=this.handleClick.bind(this);

    }





    componentDidMount() {
        console.log("url parameter",this.props);
        fetch("http://localhost:8080/search?Game Of Thrones")
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

        return (
            <div>
            <Navbar/>
            <YouTube
                videoId={this.state.id}
                opts={opts}
                onReady={this._onReady}
                onPlay={this.handleClick}
            />
            </div>
        );
    }



}

export default MovieProfile;