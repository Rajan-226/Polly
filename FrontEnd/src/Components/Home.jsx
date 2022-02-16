import React, { useEffect, userPolls } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
} from "reactstrap";
import { useState } from "react";
import auth from "../Api/auth-helper";
import { useNavigate } from "react-router-dom";
import { readall, readUser } from "../Api/api-poll";

function Home() {
    const [allPolls, setAllPolls] = useState([]);
    const [userPolls, setUserPolls] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        setAllPolls(await readall());

        if (auth.isAuthenticated()) {
            setUserPolls(await readUser());
        }
    }, []);

    const [tab, setTab] = useState("1");

    const allPollsUI = allPolls.map((poll) => {
        return (
            <li
                className="list-group-item list-group-item-info"
                style={{ cursor: "pointer" }}
                onClick={() => goToPoll(poll._id)}
                key={poll._id}
            >
                <i className="bi bi-pie-chart-fill"></i>
                &nbsp;&nbsp;
                {poll.question}
            </li>
        );
    });

    const userPollsUI = userPolls.map((poll) => {
        return (
            <li
                className="list-group-item list-group-item-info"
                style={{ cursor: "pointer" }}
                onClick={() => goToPoll(poll._id)}
                key={poll._id}
            >
                <i className="bi bi-pie-chart-fill"></i>
                &nbsp;&nbsp;
                {poll.question}
            </li>
        );
    });

    function goToPoll(_id) {
        // console.log("Going to poll", _id);
        navigate(`/Poll/${_id}`);
    }

    return (
        <>
            <Nav className="mt-4 justify-content-center" tabs>
                <NavItem style={{ marginRight: "1em" }}>
                    <NavLink
                        active={tab == "1"}
                        onClick={() => {
                            setTab("1");
                        }}
                        style={{ color: "#495057", cursor: "pointer" }}
                    >
                        All Polls
                    </NavLink>
                </NavItem>
                {auth.isAuthenticated() && (
                    <NavItem>
                        <NavLink
                            active={tab == "2"}
                            onClick={() => {
                                setTab("2");
                            }}
                            style={{ color: "#495057", cursor: "pointer" }}
                        >
                            Your Polls
                        </NavLink>
                    </NavItem>
                )}
            </Nav>

            <TabContent activeTab={tab}>
                <TabPane tabId="1">
                    <Row style={{ marginRight: "0" }}>
                        <Col className="mx-auto" md="8">
                            <ul className="list-group polls">{allPollsUI}</ul>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row style={{ marginRight: "0" }}>
                        <Col className="mx-auto" md="8">
                            <ul className="list-group polls">{userPollsUI}</ul>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    );
}

export default Home;
