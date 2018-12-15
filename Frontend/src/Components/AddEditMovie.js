import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {DropdownButton,ButtonToolbar,MenuItem} from 'react-bootstrap/lib';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Select from 'react-select';
import 'react-dropdown/style.css';
import Navbar from './Navbar.js';
import axios from 'axios'



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

//Define a AddMovie Component
class AddMovie extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = { 
            title       : null,
            genre       : '',
            studioName  : null,
            synopsis    : null,
            imageURL    : null,
            movieURL    : null,
            actors      : null,
            director    : null,
            country     : null,
            rating      : '',
            availability: '',
            price       : null,
            year        : null

        };

    }

    componentDidMount=()=>{
        console.log("Inside componentDidMount Add/Edit movie")
        //Give movie id as param   //this.props.location.state.movieID
        if(true){
            axios.get("http:localhost:8080/getMovieDetails",{
                params: {
                    movieID : 1
                  //movieID : this.props.location.state.movieID
                }
            })
            .then(response => {
                if(response.data.status === 200){
                    console.log("Successfully fetched movie details",response.data)
                    this.setState({
                        title       : response.data.title,
                        genre       : response.data.genre,
                        studioName  : response.data.studioName,
                        synopsis    : response.data.synopsis,
                        imageURL    : response.data.imageURL,
                        movieURL    : response.data.movieURL,
                        actors      : response.data.actors,
                        director    : response.data.director,
                        country     : response.data.country,
                        rating      : response.data.rating,
                        availability: response.data.availability,
                        price       : response.data.price,
                        year        : response.data.year
                    })
                }else{
                    console.log("Something went wrong while fetching movie details")
                }
            }).catch(err=>{
                console.log("Catch block,Something went wrong while fetching movie details",err);
            })
        }
    }

    titleChangeHandler=(e)=>{
        this.setState({
            title : e.target.value
        })
    }

    genreChangeHandler=(selectedOption)=>{
        this.setState({ genre : selectedOption});
    }

    studioNameChangeHandler=(e)=>{
        this.setState({
            studioName : e.target.value
        })
    }

    synopsisChangeHandler=(e)=>{
      this.setState({
        synopsis : e.target.value
      })
    }

    imageURLChangeHandler=(e)=>{
      this.setState({
        imageURL : e.target.value
      })
    }

    movieURLChangeHandler=(e)=>{
      this.setState({
        movieURL : e.target.value
      })
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

    selectCountry (val) {
        this.setState({ country: val });
    }

    priceChangeHandler=(e)=>{
      this.setState({price : e.target.value})
    }

    ratingChangeHandler=(selectedOption)=>{
        this.setState({ rating : selectedOption});
    }

    availabilityChangeHandler= (selectedOption) => {
        console.log("selected option",selectedOption)
        this.setState({ availability : selectedOption});
    }

    yearChangeHandler= (e) => {
        //console.log("selected option",selectedOption)
        this.setState({ year : e.target.value});
    }

    submitMovie=()=>{
        let movieDetails={
            // title       : this.state.title,
            // genre       : this.state.genre,
            // studioName  : this.state.studioName,
            // synopsis    : this.state.synopsis,
            // imageURL    : this.state.imageURL,
            // movieURL    : this.state.movieURL,
            // actors      : this.state.actors,
            // director    : this.state.director,
            // country     : this.state.country,
            // rating      : this.state.rating.value,
            // availability: this.state.rating.availability,
            // price       : this.state.price
        }

        console.log("...........",this.state.country,this.state.director)

        if(this.state.title!=null && this.state.title!=undefined){
            movieDetails.title=this.state.title;
        }

        if(this.state.genre.value!=null && this.state.genre.value!=undefined){
            movieDetails.genre=this.state.genre.value;
        }

        if(this.state.synopsis!=null && this.state.synopsis!=undefined){
            movieDetails.synopsis=this.state.synopsis;
        }

        if(this.state.studioName!=null && this.state.studioName!=undefined){
            movieDetails.studio=this.state.studioName;
        }

        if(this.state.imageURL!=null && this.state.imageURL!=undefined){
            movieDetails.image=this.state.imageURL;
        }

        if(this.state.movieURL!=null && this.state.movieURL!=undefined){
            movieDetails.movie=this.state.movieURL;
        }

        if(this.state.actors!=null && this.state.actors!=undefined){
            movieDetails.actors=this.state.actors;
        }

        if(this.state.director!=null && this.state.director!=undefined){
            movieDetails.director=this.state.director;
        }

        if(this.state.country!=null && this.state.country!=undefined){
            movieDetails.country=this.state.country;
        }

        if(this.state.rating.value!=null && this.state.rating.value!=undefined){
            movieDetails.rating=this.state.rating.value;
        }

        if(this.state.availability.value!=null && this.state.availability.value!=undefined){
            console.log(this.state.availability,this.state.availability.value)
            movieDetails.availability=this.state.availability.value;
        }

        if(this.state.price!=null && this.state.price!=undefined){
            movieDetails.price=this.state.price;
        }

        if(this.state.year!=null && this.state.year!=undefined){
            movieDetails.year=this.state.year;
        }



        console.log("Displaying State",movieDetails);

        axios.post("http://localhost:8080/add-movie",movieDetails)
            .then(response => {
                if(response.data.status === "SUCCESS"){
                    console.log("Received success from the backend after successfully inserting the booking record",response.data)
                    this.setState({
                        success : "You have successfully made the booking!!!!",
                        count   : 1
                    })

                    this.props.history.push("/video",{
                        movieID : response.data.type
                    })
                }else{
                    console.log("entered into failure")
                }
            }).catch(res=>{
                console.log("Inside catch block of bookingEventHandler",res);
            })
    }


    render(){
        const { country, region } = this.state;
        const addEdit= (this.state.title==undefined || this.state.title==null) ? "Add a" : "Edit the"
        return(
            <div style={{backgroundColor: "black"}}>
                <Navbar history={this.props.history}/>
                <div id="img">
                <div class="container">
                    <h1 style={{color : "red"}}>{addEdit} Movie</h1>
                    <div class="login-form">
                        <div id="signupAdd">
                                <div class="form-group">
                                    <input value={this.state.tilte} onChange = {this.titleChangeHandler} type="text" class="form-control" name="title" placeholder="Title" required/>
                                </div>

                                <div class="form-group" style={{color : "black"}}>
                                     <Select class="form-control"  value={this.state.genre} onChange={this.genreChangeHandler} options={options2} placeholder="Genre"/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.studioName} onChange = {this.studioNameChangeHandler} type="text" class="form-control"  name="studioName" placeholder="Studio Name" required/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.synopsis} onChange = {this.synopsisChangeHandler} type="text" class="form-control"  name="synopsis" placeholder="Synopsis" required/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.imageURL} onChange = {this.imageURLChangeHandler} type="text" class="form-control"  name="imageURL" placeholder="Image URL" required/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.movieURL} onChange = {this.movieURLChangeHandler} type="text" class="form-control"  name="movieURL" placeholder="Movie URL" required/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.actors} onChange = {this.actorsChangeHandler} type="text" class="form-control"  name="actors" placeholder="Actors" required/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.director}  onChange = {this.directorChangeHandler} type="text" class="form-control"  name="director" placeholder="Director" required/>
                                </div>

                                <div class="form-group ">
                                    <CountryDropdown class="form-control"  value={country} onChange={(val) => this.selectCountry(val)}  />
                                </div>

                                <div class="form-group" style={{color : "black"}}>
                                    <Select class="form-control"  value={this.state.rating} onChange={this.ratingChangeHandler} options={options} placeholder="Rating"/>
                                </div>

                                <div class="form-group" style={{color : "black"}}>
                                    <Select class="form-control"  value={this.state.availability} onChange={this.availabilityChangeHandler} options={options1} placeholder="Availability"/>
                                </div>

                                <div class="form-group ">
                                    <input value={this.state.price} onChange = {this.priceChangeHandler} type="text" class="form-control"  name="price" placeholder="Price" required/>
                                </div>

                                <div className="form-group ">
                                    <input value={this.state.year} onChange={this.yearChangeHandler} type="text"
                                           className="form-control" name="price" placeholder="Year" required/>
                                </div>

                                <button style={{backgroundColor : "red"}} onClick = {this.submitMovie}  class="btn btn-primary"><b>Add</b></button>                 
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
//export AddMovie Component
export default AddMovie;