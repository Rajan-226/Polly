import decode from "jwt-decode";

// creating a poll
const create = async (entity) => {
    try {
        entity.token = decode(localStorage.getItem("jwtToken"));
        let response = await fetch("http://localhost:5000/api/polls", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entity),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// all polls in db
const readall = async () => {
    try {
        let response = await fetch("http://localhost:5000/api/polls", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

//read polls of a user
const readUser = async () => {
    try {
        let response = await fetch("http://localhost:5000/api/polls/user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("jwtToken")),
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// specific poll with id
const readOne = async (pollId) => {
    try {
        let response = await fetch(
            "http://localhost:5000/api/polls/" + pollId,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// voting a poll
const vote = async (pollId, data) => {
    try {
        data.token = decode(localStorage.getItem("jwtToken"));
        let response = await fetch(
            "http://localhost:5000/api/polls/" + pollId,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { create, readUser, readall, readOne, vote };
