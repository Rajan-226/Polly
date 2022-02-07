import React, { useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";

function Create() {
    var [options, setOptions] = useState(["", ""]);

    async function handleSubmit(e) {
        e.preventDefault();

        // navigate("/");
    }
    

    function addOption() {
        setOptions([...options, ""]);
    }

    const optionsUI = options.map((option, i) => (
        <div className="ml-3" key={i}>
            <FormGroup row>
                <Label
                    className="form-label"
                    style={{ paddingRight: "15px", width: "15%" }}
                >
                    Option
                </Label>
                <Col md={6}>
                    <Input
                        className="form-input"
                        type="text"
                        value={option}
                        key={i}
                        onChange={(e) => this.handleAnswer(e, i)}
                    />
                </Col>
            </FormGroup>
        </div>
    ));

    return (
        <div className="container-fluid">
            <div className="col-6 mx-auto mt-5">
                <Form className="form" onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label
                            htmlFor="question"
                            style={{ paddingRight: "15px", width: "15%" }}
                        >
                            Question
                        </Label>
                        <Col md={10}>
                            <Input
                                className="form-input"
                                type="text"
                                name="question"
                                // value={this.state.question}
                                // onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>

                    <div>{optionsUI}</div>

                    <div className="row">
                        <Col md={{ size: 4 }}>
                            <Button
                                outline
                                color="primary"
                                type="button"
                                onClick={addOption}
                            >
                                Add options
                            </Button>
                        </Col>
                    </div>

                    <div className="row">
                        <Col md={{ size: 12 }}>
                            <Button className="btn-warning" type="submit">
                                Create Poll
                            </Button>
                        </Col>
                    </div>
                </Form>

                {/* <Modal isOpen={this.state.open} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Your Poll has been created !
                    </ModalHeader>
                    <ModalBody>
                        <Button className="btn-primary">
                            <Link
                                style={{ color: "#FFF" }}
                                to={"/poll/" + this.state.id}
                            >
                                View
                            </Link>
                        </Button>
                    </ModalBody>
                </Modal> */}
            </div>
        </div>
    );
}

export default Create;
