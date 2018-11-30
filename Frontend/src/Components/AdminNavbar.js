import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem,ButtonToolbar,Button} from 'react-bootstrap';

//create the Navbar_Home Component
class NetNavbar extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div >
            <Navbar inverse collapseOnSelect style={{backgroundColor: "black"}}>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#" style={{color : "white", paddingBottom : "50%"}}><h2>HOME</h2></a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title="Login/Logout" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}><Link to="/Userlogin">User Login</Link></MenuItem>
                    <MenuItem eventKey={3.2}><Link to="/logout">Logout</Link></MenuItem>
                    </NavDropdown>
                    {/*
                    <NavDropdown eventKey={4} title="Help" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1}>Visit help center</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.2}>Travelers</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.3}>Homeowners</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.3}>Property Managers</MenuItem>
                    </NavDropdown>*/}
                    <MenuItem divider /> 
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}

export default NetNavbar;




