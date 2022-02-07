import React, { useRef } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback,
    Modal,
    ModalHeader,
    ModalBody,
    Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const nameRef = useRef("");
    const passRef = useRef("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
            userName: nameRef.current.value,
            passWord: passRef.current.value,
        };
        // console.log(user);

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
            });

        // fetch("http://localhost:5000/login")
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // fetch("http://localhost:5000/data")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // setData(data);
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // navigate("/");
    }

    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12 col-md-9 mt-5">
                    {/* {this.state.error && (
                        <Alert color="danger">{this.state.error}</Alert>
                    )} */}
                    <Form
                        onSubmit={handleSubmit}
                        // onChange={this.handleInputChange}
                    >
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
                                    // value={this.state.username}
                                    // valid={errors.username === ""}
                                    // invalid={errors.username !== ""}
                                    // onBlur={this.handleBlur("username")}
                                />
                                {/* <FormFeedback>{errors.username}</FormFeedback> */}
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
                                    // value={this.state.password}
                                    // valid={errors.password === ""}
                                    // invalid={errors.password !== ""}
                                    // onBlur={this.handleBlur("password")}
                                />
                                {/* <FormFeedback>{errors.password}</FormFeedback> */}
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
            {/* <Modal isOpen={this.state.open} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    You have successfully Logged In ! <br />
                </ModalBody>
            </Modal> */}
        </div>
    );
}

export default Login;
