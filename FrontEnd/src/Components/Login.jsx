import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/api-auth";
import auth from "../Api/auth-helper";

function Login() {
    const nameRef = useRef("");
    const passRef = useRef("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const user = {
            username: nameRef.current.value,
            password: passRef.current.value,
        };

        const response = await login(user);

        if (response.error) {
            setError(response.message);
        } else {
            auth.authenticate(response.token);
            window.location.href = "/";
        }

        // navigate("/");
    }

    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md-9 mt-5">
                    {error && <Alert color="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="username" md={2}>
                                Username
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="username"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    innerRef={nameRef}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="password" md={2}>
                                Password
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    innerRef={passRef}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
