import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function Header(props) {
    let history = useHistory();
    const handleLogout = () => {
        history.push('/');
        sessionStorage.clear();
    }
    const handleOrders = () => {
        history.push('/orders');
    }
    return(
        <Navbar bg="danger" variant="dark">
        <Navbar.Brand href="#home">CasaOne</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Nav className="pull-right">
        <Nav.Link onClick={handleOrders}>Orders</Nav.Link>
        {!sessionStorage.getItem('isAuthenticated') ?
        <Nav.Link href="/#/login">Login</Nav.Link>:
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      }
    </Nav>
      </Navbar>
    )
}
