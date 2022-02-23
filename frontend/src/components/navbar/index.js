import React from 'react';
import {Nav,NavbarContainer, NavLogo, Bu} from './navbarElements';
import {Button} from 'react-bootstrap';

const Navbar = () => {
    return (
        // <div className='navBar'>
        //     <img src="/icon.png"></img>
        //     Search
        //     <button className='loginBtn'>Login</button>
        // </div>
        <>
            <Button>GHG</Button>
            <Bu>GLKJL</Bu>
            <Nav>
                <NavbarContainer>
                    <Bu>GG</Bu>
                    <NavLogo to="/login">
                        OpenLibrary
                    </NavLogo>
                </NavbarContainer>
            </Nav>
        </>
    );
}

export default Navbar;