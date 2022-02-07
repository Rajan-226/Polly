import React from "react";
import { Alert, Button } from "reactstrap";
import { VictoryPie } from "victory";
import { useState } from "react";

function Poll() {
    const poll = {
        question: "DSA VS DEV",
        options: [
            { option: "1", votes: 1, id: 1 },
            { option: "2", votes: 1, id: 1 },
            { option: "3", votes: 3, id: 1 },
            { option: "4", votes: 1, id: 1 },
        ],
    };
    const [resultOpen, setResultOpen] = useState(false);

    const optionIcons =
        poll.options &&
        poll.options.map(
            (option) =>
                option.option && (
                    <Button
                        // onClick={() =>
                        //     vote(this.state.poll._id, {
                        //         answer: option.option,
                        //     }).then((data) => {
                        //         if (data.error)
                        //             this.setState({
                        //                 msg: "",
                        //                 error: data.message,
                        //             });
                        //         else
                        //             this.setState({
                        //                 error: "",
                        //                 msg: "Your Vote has been successfully recorded",
                        //             });
                        //         this.refresh();
                        //     })
                        // }
                        className="btn-primary ms-3"
                        color="warning"
                        key={option._id}
                    >
                        {option.option}
                    </Button>
                )
        );
    const response =
        poll.options &&
        poll.options.map(
            (option) =>
                option.option && (
                    <Button
                        className="btn-primary ms-3"
                        color="info"
                        key={option.id}
                    >
                        {option.option}
                        &nbsp;-&nbsp;
                        {option.votes}
                    </Button>
                )
        );
    return (
        <div className="container mt-5">
            <h4 className="col-md-10 mx-auto">
                <Alert color="info">{poll.question}</Alert>
            </h4>
            <div className="buttons_center mt-4 mb-4">{optionIcons}</div>
            <Button onClick={() => setResultOpen(!resultOpen)}>
                View Results
            </Button>
            <Button className="ms-2" onClick={() => 10000000}>
                <i class="bi bi-arrow-clockwise"></i>
            </Button>

            {resultOpen && (
                <div
                    className="container mt-3"
                    style={{ border: "2px solid black" }}
                >
                    <div className="container mt-3 mb-3">{response}</div>

                    <VictoryPie
                        data={poll.options}
                        responsive={true}
                        startAngle={50}
                        endAngle={450}
                        height={200}
                        size={50}
                        animate={{
                            duration: 2000,
                        }}
                        colorScale={[
                            "tomato",
                            "orange",
                            "gold",
                            "cyan",
                            "navy",
                        ]}
                        x={(data) => (data.votes > 0 ? data.option : null)}
                        y={(data) => (data.votes > 0 ? data.votes : null)}
                        style={{
                            labels: {
                                fill: "black",
                                fontSize: 9,
                                fontWeight: "bold",
                            },
                            data: {
                                fillOpacity: 0.9,
                                stroke: "#c43a31",
                                strokeWidth: 1,
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default Poll;
