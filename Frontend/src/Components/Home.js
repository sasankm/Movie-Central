import React, {Component} from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import url from '../serverurl';
import Select from 'react-select';
//import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';

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
            movies      : [],
            found       : false
        };
    }


    componentDidMount(){
        var self = this;
        //check session and type of user and display navbar accordingly
        axios.get(url + "/checksession", {headers : { Authorization : localStorage.getItem("sessionID") }})
        .then((response) => {
            console.log("in check session of homepage", response.data);
            if(response.data.message === "invalid session"){ //change to !== after session is done
                self.props.history.push("/login");
            } else {
                self.setState({type : response.data.type});
            }
        })
    }


    searchMovie=()=>{
        console.log("search movie clicked.....");

        var params = new URLSearchParams();

        if(this.state.movieName!=null && this.state.movieName!=undefined){
            let splitArr=this.state.movieName.split(" ");
            splitArr.forEach((ele)=>{
                console.log(ele);
                params.append("key", ele);
            })
        }

        if(this.state.genre!=null && this.state.genre.value!=undefined){
            console.log(this.state.genre.value)
            params.append("genre",this.state.genre.value)
        }

        if(this.state.rating!=null && this.state.rating.value!=undefined){
            console.log(this.state.genre.value)
            params.append("rating",this.state.rating.value)
        }

        if(this.state.availability!=null && this.state.availability.value!=undefined){
            console.log(this.state.availability.value)
            params.append("availability",this.state.availability.value)
        }

        if(this.state.actors!=null && this.state.actors!=undefined){
            console.log(this.state.actots)
            params.append("actors",this.state.actors)
        }

        if(this.state.director!=null && this.state.director!=undefined){
            console.log(this.state.director)
            params.append("director",this.state.director)
        }
        
        var request = {
             params: params,
             headers : { 
                Authorization : "40410102" 
             }
        };

        console.log("Data to be sent to backend",request);

        axios.get("http://localhost:8080/search",request)
            .then(response => {
                if(response.data.status === "SUCCESS"){
                    console.log("Successfully received movies from backend", response.data)
                    this.setState({
                        movies : response.data.movies,
                        found  : true
                    })
                }else{
                    console.log("entered into failure")
                }
            }).catch(err=>{
                console.log("Inside catch block of bookingEventHandler",err);
            })

    }

    genreChangeHandler=(selectedOption)=>{
       console.log("Selected Option",selectedOption)
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
        let movies=[...this.state.movies]
        let heading=null;
        if(this.movieChangeHandler.length>0 && this.state.found){
            heading=(
                <div>
                    <h2 style={{color : "red", paddingLeft : "32%"}}>Below are you search results</h2>
                    <hr/>
                </div>
            )
        }
        return(
            <div style={{backgroundColor: "black"}}>
                <div id="img1">
                    <Navbar history={this.props.history}/>
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

                            <button style={{width : "60%",height : "50%", paddingTop : "1%", paddingBottom : "2%", backgroundColor : "red"}}
                            className="btn btn-primary" onClick={this.searchMovie} type="button"><h3>Search</h3></button>
                        </form>
                    </div>
                </div>


                <div style={{paddingLeft : "10%", backgroundColor : "black"}}>
                    <br/>
                    {heading}
                    {movies.map(mov=>(
                        <button onClick={() => { this.props.history.push('/video/'+mov.movieid) }}>
                            <div style={{color:"red"}}>
                            <Card>
                                <CardBody>
                                <CardTitle style={{color: "black"}}><h3>{mov.title}</h3></CardTitle>
                                <CardSubtitle>{mov.description}</CardSubtitle>
                                </CardBody>
                                <img width="20%" height="25%" src={require('./SearchBackground.jpg')} alt="Card image cap" />
                                <CardBody>
                                    <CardText style={{color : "black"}}><b>Year:</b>{mov.year}</CardText>
                                    <CardText style={{color : "black"}}><b>Actor:</b>{mov.actors}</CardText>
                                    <CardText style={{color : "black"}}><b>Director:</b>{mov.director}</CardText>
                                    <CardText style={{color : "black"}}><b>Availability:</b>{mov.availability}</CardText>
                                    <CardText style={{color : "black"}}><b>Price:</b>{mov.price}</CardText>
                                    <CardText style={{color : "black"}}><b>Avg rating:</b>{mov.stars}</CardText>
                                </CardBody>
                            </Card>
                            <b><hr style={{borderColor : "red"}}/></b>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        );
    }
}

export default Home;
