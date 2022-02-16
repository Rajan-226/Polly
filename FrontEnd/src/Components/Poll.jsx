import React from "react";
import { Alert, Button } from "reactstrap";
import { VictoryPie } from "victory";
import { useEffect, useState } from "react";
import { readOne } from "../Api/api-poll";
import { useParams } from "react-router-dom";
import { vote } from "../Api/api-poll";

function Poll() {
    const { id } = useParams();
    const [poll, setPoll] = useState({});
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
    const [resultOpen, setResultOpen] = useState(false);

    useEffect(async () => {
        await getPoll();
    }, []);

    async function getPoll() {
        // console.log(id);
        // const resp = await readOne(id);
        // console.log(resp);

        setPoll(await readOne(id));
    }

    async function voteOption(option) {
        // console.log(option); 
        const resp = await vote(id, { answer: option });
        console.log(resp);
        if (resp.error) {
            setMsg(null);
            setError(resp.error);
        } else {
            setMsg("Voted successfully");
        }

        await getPoll();
    }

    const optionIcons =
        poll.options &&
        poll.options.map(
            (current) =>
                current.option && (
                    <Button
                        onClick={() => voteOption(current.option)}
                        className="btn-primary ms-3"
                        color="warning"
                        key={current._id}
                    >
                        {current.option}
                    </Button>
                )
        );

    const responseUI =
        poll.options &&
        poll.options.map(
            (current) =>
                current.option && (
                    <Button
                        className="btn-primary ms-3"
                        color="info"
                        key={current._id}
                    >
                        {current.option}
                        &nbsp;-&nbsp;
                        {current.votes}
                    </Button>
                )
        );
    return (
        <div className="container mt-5">
            {error && (
                <Alert className="col-md-6 mx-auto" color="danger">
                    {error}
                </Alert>
            )}

            {msg && (
                <Alert className="col-md-8 mx-auto" color="primary">
                    {msg}
                </Alert>
            )}

            <h4 className="col-md-10 mx-auto">
                <Alert color="info">{poll.question}</Alert>
            </h4>
            <div className="buttons_center mt-4 mb-4">{optionIcons}</div>

            <Button onClick={() => setResultOpen(!resultOpen)}>
                View Results
            </Button>

            <Button className="ms-2" onClick={getPoll}>
                <i className="bi bi-arrow-clockwise"></i>
            </Button>

            {resultOpen && (
                <div
                    className="container mt-3"
                    style={{ border: "2px solid black" }}
                >
                    <div className="container mt-3 mb-3">{responseUI}</div>

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
