import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem,ButtonToolbar,Button} from 'react-bootstrap';

//create the Navbar_Home Component
class NetNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            username: '',
            usertype: ''
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        //check session and type of user and display navbar accordingly
    }

    handleLogout(){
        //handle logout
    }

    render(){
        let changes = null;
        if(this.state.isLoggedIn == false){
            changes = (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/login"><h3>Login</h3></NavItem>
                    <NavItem eventKey={2} href="/signup"><h3>Signup</h3></NavItem>
                </Nav>
            );
        } else if(this.state.isLoggedIn == true && this.state.usertype == 'admin'){  //admin navbar
            changes = (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/financial-report"><h4>Report</h4></NavItem>
                    <NavItem eventKey={2} href="/stats"><h4>Stats</h4></NavItem>
                    <NavItem eventKey={3} href="/addEditmovie"><h4>Add/Edit Movie</h4></NavItem>
                    <NavItem eventKey={4} href="/logout" onClick={this.handleLogout}><h4>Logout</h4></NavItem>
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
                    <a href="#" style={{color : "white", paddingBottom : "50%"}}><h3><strong>NETFLIX</strong></h3></a>
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




