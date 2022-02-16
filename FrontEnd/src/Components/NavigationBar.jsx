import React, { useEffect, useState } from "react";
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
import auth from "../Api/auth-helper";

export default function NavigationBar() {
    const [isUser, setIsUser] = useState(auth.isAuthenticated());
    
    // useEffect(() => {
    //     setIsUser();
    // }, []);

    function logout() {
        auth.clearJWT();
        window.location.href = "/";
    }
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

                    {!isUser && (
                        <NavItem className="mx-md-3">
                            <NavLink tag={Link} to="/login">
                                <i className="bi bi-box-arrow-in-right"></i>
                                &nbsp; LogIn
                            </NavLink>
                        </NavItem>
                    )}

                    {!isUser && (
                        <NavItem className="mx-md-3">
                            <NavLink tag={Link} to="/register">
                                <i className="bi bi-box-arrow-in-right"></i>
                                &nbsp; Register
                            </NavLink>
                        </NavItem>
                    )}

                    {isUser && (
                        <NavItem className="mx-md-3">
                            <Button
                                outline
                                color="warning"
                                tag={Link}
                                to="/Create"
                            >
                                <i className="bi bi-plus-circle"></i>&nbsp; Create
                                Poll
                            </Button>
                        </NavItem>
                    )}

                    {isUser && (
                        <NavItem className="mx-md-3">
                            <Button outline color="info" onClick={logout}>
                                <i className="bi bi-box-arrow-right"></i>
                                &nbsp;SignOut
                            </Button>
                        </NavItem>
                    )}
                </Nav>
            </Navbar>
        </>
    );
}
