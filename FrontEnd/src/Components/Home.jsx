import React from "react";
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

function Home() {
    const pollsArray = [
        {
            topic: "DSA VS DEV",
            id: 0,
        },
        {
            topic: "DSA VS DEV 2",
            id: 1,
        },
        {
            topic: "DSA VS DEV 3",
            id: 2,
        },
        {
            topic: "DSA VS DEV 4",
            id: 3,
        },
    ];
    const [tab, setTab] = useState("1");

    const allPolls = pollsArray.map((poll) => {
        return (
            <li
                className="list-group-item list-group-item-info"
                style={{ cursor: "pointer" }}
                onClick={() => goToPoll(poll.id)}
                key={poll.id}
            >
                <i className="bi bi-pie-chart-fill"></i>
                &nbsp;&nbsp;
                {poll.topic}
            </li>
        );
    });
    const userPolls = pollsArray.map((poll) => {
        return (
            <li
                className="list-group-item list-group-item-info"
                style={{ cursor: "pointer" }}
                onClick={() => goToPoll(poll.id)}
                key={poll.id}
            >
                <i className="bi bi-pie-chart-fill"></i>
                &nbsp;&nbsp;
                {"User " + poll.topic}
            </li>
        );
    });

    function goToPoll(id) {
        console.log("Going to poll", id);
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
            </Nav>
            
            <TabContent activeTab={tab}>
                <TabPane tabId="1">
                    <Row>
                        <Col className="mx-auto" md="8">
                            <ul className="list-group polls">{allPolls}</ul>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col className="mx-auto" md="8">
                            <ul className="list-group polls">{userPolls}</ul>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    );
}

export default Home;
