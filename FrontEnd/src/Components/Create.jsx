import React, { useState, useRef } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { create } from "../Api/api-poll";
import { useNavigate } from "react-router-dom";

function Create() {
    var [options, setOptions] = useState(["", ""]);
    const questionRef = useRef("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const poll = {
            question: questionRef.current.value,
            options: options.filter((option) => option !== ""),
        };
        await create(poll);
        navigate("/");
    }

    function addOption() {
        setOptions([...options, ""]);
    }

    function handleAnswer(e, index) {
        const nextOptions = [...options];
        nextOptions[index] = e.target.value;
        setOptions(nextOptions);
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
                        key={i}
                        onChange={(e) => handleAnswer(e, i)}
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
                                innerRef={questionRef}
                                required
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
            </div>
        </div>
    );
}

export default Create;
