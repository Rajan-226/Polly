import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback,
    Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../Api/api-auth";
import auth from "../Api/auth-helper";

const touched = {
    realName: false,
    userName: false,
    pass: false,
};

function Register() {
    const realNameRef = useRef(null);
    const userNameRef = useRef(null);
    const passRef = useRef(null);
    const [errors, setErrors] = useState({
        name: "",
        password: "",
        username: "",
    });

    const navigate = useNavigate();

    const [errorFromBackEnd, setErrorFromBackEnd] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        setErrorFromBackEnd(null);

        const user = {
            username: userNameRef.current.value,
            password: passRef.current.value,
        };

        const response = await register(user);
        if (response.error) {
            setErrorFromBackEnd(response.message);
        } else {
            auth.authenticate(response.token, () => {});
            window.location.href = "/";
        }

        // navigate("/");
    }

    function handleInputChange(e) {
        validate();
    }

    function validate() {
        const newErrors = {
            name: "",
            password: "",
            username: "",
        };

        if (realNameRef.current.value && realNameRef.current.value.length >= 3)
            newErrors.name = "success";
        else if (touched.realName && realNameRef.current.value.length < 3)
            newErrors.name = "Name should be greater than 3 characters";

        if (passRef.current.value && passRef.current.value.length >= 6)
            newErrors.password = "success";
        else if (touched.pass && passRef.current.value.length < 6)
            newErrors.password = "Password should be greater than 6 characters";

        if (userNameRef.current.value && userNameRef.current.value.length >= 3)
            newErrors.username = "success";
        else if (touched.userName && userNameRef.current.value.length < 3)
            newErrors.username = "Username should be greater than 3 characters";

        setErrors({ ...errors, ...newErrors });
    }

    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md-9 mt-5">
                    {errorFromBackEnd && (
                        <Alert color="danger">{errorFromBackEnd}</Alert>
                    )}
                    <Form onSubmit={handleSubmit} onChange={handleInputChange}>
                        <FormGroup row>
                            <Label htmlFor="name" md={2}>
                                Name
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    innerRef={realNameRef}
                                    valid={errors.name == "success"}
                                    invalid={
                                        errors.name !== "success" &&
                                        errors.name !== ""
                                    }
                                    onBlur={() => {
                                        touched.realName = true;
                                        validate();
                                    }}
                                    required
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </Col>
                        </FormGroup>

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
                                    innerRef={userNameRef}
                                    valid={errors.username == "success"}
                                    invalid={
                                        errors.username !== "success" &&
                                        errors.username !== ""
                                    }
                                    onBlur={() => {
                                        touched.userName = true;
                                        validate();
                                    }}
                                    required
                                />
                                <FormFeedback>{errors.username}</FormFeedback>
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
                                    valid={errors.password == "success"}
                                    invalid={
                                        errors.password !== "success" &&
                                        errors.password !== ""
                                    }
                                    onBlur={() => {
                                        touched.pass = true;
                                        validate();
                                    }}
                                    required
                                />
                                <FormFeedback>{errors.password}</FormFeedback>
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

export default Register;
