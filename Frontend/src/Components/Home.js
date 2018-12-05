import React, {Component} from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import url from '../serverurl';
import Select from 'react-select';

const options = [
    { value: 'PG', label: 'PG' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'G', label: 'G' },
    { value: 'NC-17', label: 'NC-17' }
];

const options1 = [
    { value: 'Free', label: 'Free' },
    { value: 'SubscriptionOnly', label: 'SubscriptionOnly' },
    { value: 'PayPerViewOnly', label: 'PayPerViewOnly' },
    { value: 'Paid', label: 'Paid' }
];

const options2 = [
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Sci-fi', label: 'Sci-fi' },
    { value: 'Horror', label: 'Drama' },
    { value: 'Action and Adventure', label: 'Action and Adventure' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Comedy-Romance', label: 'Comedy-Romance' },
    { value: 'Action-Comedy', label: 'Action-Comedy' },
    { value: 'Superhero', label: 'Superhero' }
]

class Home extends Component {
   //call the constructor method
   constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = { 
            movieName   : '',
            genre       : '',
            rating      : '',
            availability: '',
            actors      : '',
            director    : '',
            movieResult : null
        };
    }


    searchMovie=()=>{
        console.log("search movie clicked.....");

        var params = new URLSearchParams();

        if(this.state.movieName!=null || this.state.movieName!=undefined){
            let splitArr=this.state.movieName.split("");
            splitArr.forEach((ele)=>{
                params.append("key", ele);
            })
        }

        if(this.state.genre!=null || this.state.genre!=undefined){
            params.append("genre",this.state.genre.value)
        }

        if(this.state.rating!=null || this.state.rating!=undefined){
            params.append("rating",this.state.genre.value)
        }

        if(this.state.availability!=null || this.state.availability!=undefined){
            params.append("availability",this.state.genre.value)
        }

        if(this.state.actors!=null || this.state.actors!=undefined){
            params.append("actors",this.state.genre.value)
        }

        if(this.state.director!=null || this.state.director!=undefined){
            params.append("director",this.state.genre.value)
        }
        
        var request = {
             params: params
        };

        console.log("Data to be sent to backend",request);

        //http://example.com/?key=""&key=""&key=""&genre=""&rating=""

        axios.get("http://localhost:8080/search",request)
            .then(response => {
                if(response.data.status === 200){
                    console.log("Received success from the backend after successfully inserting the booking record")
                    this.setState({
                        success : "You have successfully made the booking!!!!",
                        count   : 1
                    })
                }else{
                    console.log("entered into failure")
                }
            }).catch(res=>{
                console.log("Inside catch block of bookingEventHandler",res);
            })

    }

    genreChangeHandler=(selectedOption)=>{
        this.setState({ genre : selectedOption});
    }

    ratingChangeHandler=(selectedOption)=>{
        this.setState({ rating : selectedOption});
    }

    availabilityChangeHandler= (selectedOption) => {
        this.setState({ availability : selectedOption});
    }

    actorsChangeHandler=(e)=>{
        this.setState({
          actors : e.target.value
        })
      }
  
      directorChangeHandler=(e)=>{
        this.setState({
          director : e.target.value
        })
      }

      movieChangeHandler=(e)=>{
          this.setState({
              movieName : e.target.value
          })
      }


    render(){
        return(
            <div id="img1">
                <Navbar />
                <div class="container" id="home1" style={{paddingTop : "0%"}}>
                    <h1 style={{color : "red"}}>Search Movie</h1>
                    <form className="form-inline my-2 my-lg-0">
                        <div>
                            <input style={{width : "80%", paddingTop : "4%", paddingBottom : "4%"}} className="form-control mr-sm-2  
                            iconColour" type="search" onChange={this.movieChangeHandler} name="searchString" placeholder="Find Movie......" aria-label="Search" />
                        </div>

                        <br></br><br></br>

                        <div>
                            <input style={{width : "80%", paddingTop : "3%", paddingBottom : "3%"}} value={this.state.actors} onChange = {this.actorsChangeHandler} type="text" class="form-control"  name="actors" placeholder="Actors" required/>
                        </div>

                        <br></br><br></br>

                        <div>
                            <input style={{width : "80%", paddingTop : "3%", paddingBottom : "3%"}} value={this.state.director}  onChange = {this.directorChangeHandler} type="text" class="form-control"  name="director" placeholder="Director" required/>
                        </div>

                        <br></br><br></br>

                        <div style={{width : "90%", paddingLeft : "10%", color : "black"}}>
                            <Select class="form-control"  value={this.state.genre} onChange={this.genreChangeHandler} options={options2} placeholder="Genre"/>
                        </div>

                        <br></br><br></br>

                        <div style={{width : "90%", paddingLeft : "10%", color : "black"}}>
                            <Select class="form-control"  value={this.state.rating} onChange={this.ratingChangeHandler} options={options} placeholder="Rating"/>
                        </div>

                        <br></br> <br></br>

                        <div style={{width : "90%", paddingLeft : "10%", color : "black"}}>
                            <Select class="form-control"  value={this.state.availability} onChange={this.availabilityChangeHandler} options={options1} placeholder="Availability"/>
                        </div>

                        <br></br> <br></br>
                        <hr></hr>
                        <br></br> <br></br>

                        <button style={{width : "60%", paddingTop : "1%", paddingBottom : "1%", backgroundColor : "red"}} 
                        className="btn btn-primary" onClick={this.searchMovie} type="button"><h3>Search</h3></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Home;
