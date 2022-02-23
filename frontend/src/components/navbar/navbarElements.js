import styled from 'styled-components';
import { Container } from '../../globalStyles';
import {BrowserRouter as Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export const Nav = styled.nav`
    background: #101522;
    height: 80px;
    /* margin-top: -80px; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 999;

    @media screen and (max-width:960px){
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 80px;
    
    ${Container}
`

export const NavLogo = styled(Link)`
    color:#BCFFBA;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
`

export const Bu = styled(Button)`
    background-color: red;

`