import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand className="ms-2" tag={Link} to="/">
                    <i className="bi bi-pie-chart-fill"></i>
                    &nbsp; Polly
                </NavbarBrand>

                <Nav className="ms-auto" navbar>
                    <NavItem className="mx-md-3">
                        <NavLink tag={Link} to="/">
                            <i className="bi bi-house-door-fill"></i>
                            &nbsp;Home
                        </NavLink>
                    </NavItem>

                    <NavItem className="mx-md-3">
                        <NavLink tag={Link} to="/Login">
                            <i className="bi bi-box-arrow-in-right"></i>
                            &nbsp;Login
                        </NavLink>
                    </NavItem>

                    <NavItem className="mx-md-3">
                        <NavLink tag={Link} to="/Register">
                            <i className="bi bi-box-arrow-in-right"></i>
                            &nbsp;Register
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </>
    );
}
