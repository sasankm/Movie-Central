import React,{Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem,ButtonToolbar,Button} from 'react-bootstrap';
import axios from 'axios';
import url from '../serverurl';

//create the Navbar_Home Component
class NetNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            username: '',
            type: ''
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        //check session and type of user and display navbar accordingly
    }

    handleLogout(){  //handle logout
        axios.post(url + "/logout" ,null)
        .then((response) => {
            console.log("response after logging out...");
            if(response.data.status == "SUCCESS"){ //if session has been destroyed successfully
                this.props.history.push("/");
            }
            this.setState({
                isLoggedIn: false,
                username: '',
                type: ''
            })
        })
    }

    render(){
        let changes = null;
        if(this.state.isLoggedIn == false){
            changes = (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/login"><h3>SignIn</h3></NavItem>
                    <NavItem eventKey={2} href="/signup"><h3>Signup</h3></NavItem>
                </Nav>
            );
        } else if(this.state.isLoggedIn == true && this.state.type == 'admin'){  //admin navbar
            changes = (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/financial-report"><h4>Report</h4></NavItem>
                    <NavItem eventKey={2} href="/stats"><h4>Stats</h4></NavItem>
                    <NavItem eventKey={3} href="/addEditmovie"><h4>Add/Edit Movie</h4></NavItem>
                    <NavItem eventKey={4} href="/showusers"><h4>Show Users</h4></NavItem>
                    <NavItem eventKey={5} href="/logout" onClick={this.handleLogout}><h4>Logout</h4></NavItem>
                </Nav>
            );
        } else { //user navbar
            changes = (
                <Nav pullRight>
                <NavItem eventKey={1} href="/profile"><h3>My Profile</h3></NavItem>
                <NavDropdown eventKey={2} title="Scoreboard" id="basic-nav-dropdown">
                    <MenuItem eventKey={2.1} href="/movie-rating">Top movies by rating</MenuItem>
                    <MenuItem eventKey={2.2} href="/movie-play">Top movies by plays</MenuItem>
                </NavDropdown>
                <NavItem eventKey={3} href="/logout" onClick={this.handleLogout}><h4>Logout</h4></NavItem>
            </Nav>
            );
        }
        return(
            <div >
            <Navbar inverse collapseOnSelect style={{backgroundColor: "black"}}>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="/" style={{color : "white", paddingBottom : "50%"}}><h3><strong>NETFLIX</strong></h3></a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {changes}
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}

export default NetNavbar;




