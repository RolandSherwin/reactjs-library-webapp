import React from 'react';
import './navbar.css'
import { Search } from '../../components';
import { Button } from 'react-bootstrap';

const Navbar = () => {
    return (
        <div className='navBar'>
            <img src="/icon.png"></img>
            <Search />
            <button className='loginBtn'>Login</button>
        </div>
    );
}

export default Navbar;