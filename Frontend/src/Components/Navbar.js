import React,{Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem,ButtonToolbar,Button} from 'react-bootstrap';
import axios from 'axios';
import url from '../serverurl';

const dropDown = {
    fontSize: '20px',
    fontWeight: 'bold'
}

//create the Navbar_Home Component
class NetNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            type: ''
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        //check session and type of user and display navbar accordingly
        axios.get(url + "/checksession")
        .then((response) => {
            console.log("in check session of navbar", response.data);
            if(response.data.message === "invalid session"){ //change to !== after session is done
                this.setState({
                    isLoggedIn: true,
                    type: response.data.type
                }, () => {
                    console.log(this.state.type);
                })
            }
        })
    }

    handleLogout(){  //handle logout
        axios.get(url + "/userlogout" )
        .then((response) => {
            console.log("response after logging out...", response.data);
            if(response.data.status === "SUCCESS"){ //if session has been destroyed successfully
                this.props.history.push("/");
            }
            this.setState({
                isLoggedIn: false,
                type: ''
            })
        })
    }

    render(){
        let changes = null;
        if(this.state.isLoggedIn === false){
            changes = (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/login"><h3>SignIn</h3></NavItem>
                    <NavItem eventKey={2} href="/signup"><h3>Signup</h3></NavItem>
                </Nav>
            );
        } else if(this.state.isLoggedIn === true){  //admin navbar  // add this after doing session && this.state.type === 'ADMIN'
            changes = (
                <Nav pullRight>
                    <NavItem eventKey={1} href="/stats"><h4><strong>Stats</strong></h4></NavItem>
                    <NavItem eventKey={2} href="/financial"><h4><strong>Report</strong></h4></NavItem>
                    <NavItem eventKey={3} href="/addEditmovie"><h4><strong>Add/Edit movie</strong></h4></NavItem>
                    <NavItem eventKey={4} href="/showusers"><h4><strong>Show Users</strong></h4></NavItem>
                    <NavItem eventKey={5}  onClick={this.handleLogout}><h4><strong>Logout</strong></h4></NavItem>
                </Nav>
            );
        } else { //user navbar
            changes = (
                <Nav pullRight>
                <NavItem eventKey={1} href="/scoreboard"><h4><strong>Scoreboard</strong></h4></NavItem>
                <NavItem eventKey={2} href="/profile"><h4><strong>My Profile</strong></h4></NavItem>
                <NavItem eventKey={3}  onClick={this.handleLogout}><h4><strong>Logout</strong></h4></NavItem>
            </Nav>
            );
        }
        return(
            <div >
            <Navbar inverse collapseOnSelect style={{backgroundColor: "black"}}>
                <Navbar.Header>
                    <a href="/" style={{color : "white", paddingBottom : "50%"}}><h3><strong>Movie-Central</strong></h3></a>
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




