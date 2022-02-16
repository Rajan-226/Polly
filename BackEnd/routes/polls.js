const express = require("express");
const router = express.Router();
const decode = require("jwt-decode");
const dbPoll = require("./../models/polls");
const dbUser = require("./../models/users");

router.post("/", async function (request, response) {
    // console.log("Hi from post api/polls/");

    try {
        // console.log(request.body);
        const { token, question, options } = request.body;
        const user = await dbUser.findById(token.id).lean();

        const poll = await dbPoll.create({
            question,
            user,
            options: options.map((option) => ({ option, votes: 0 })),
        });
        // console.log(poll);
        // console.log(user);

        await dbUser.updateOne(
            { _id: token.id },
            {
                $set: { polls: [...user.polls, poll._id] },
            }
        );

        response.status(201).send({ work: "done" });
    } catch (err) {
        console.log(err);
        response.status(400).send({ error: err });
    }
});

router.get("/", async function (request, response) {
    // console.log("Hi from get api/polls/");
    try {
        const polls = await dbPoll
            .find()
            .populate("user", ["username", "id"])
            .lean();
        // console.log(polls);

        response.status(200).send(polls);
    } catch (err) {
        console.log(err);
        response.status(400).send(err);
    }
});

router.get("/user", async function (request, response) {
    // console.log("Hi from get api/polls/user");
    try {
        const token = decode(request.header("auth-token"));
        const user = await dbUser.findById(token.id).populate("polls").lean();
        // console.log(user);

        response.status(201).send(user.polls);
    } catch (err) {
        // console.log(err);
        response.status(400).send({ error: err });
    }
});

router.get("/:id", async function (request, response) {
    // console.log("Hi from get api/polls/:id");
    try {
        const id = request.params.id;
        const poll = await dbPoll.findById(id).lean();
        // console.log(poll);

        response.status(201).send(poll);
    } catch (err) {
        // console.log(err);
        response.status(400).send({ error: err });
    }
});

router.post("/:id", async function (request, response) {
    // console.log("Hi from post api/polls/:id");
    try {
        const id = request.params.id;
        const poll = await dbPoll.findById(id).lean();
        const { token, answer } = request.body;

        // console.log(id);
        // console.log(poll);
        // console.log(token.id);

        if (poll.voted.map((cur) => cur.toString()).includes(token.id)) {
            throw new Error("You cannot vote twice");
        } else {
            const newOptions = poll.options.map((current) => {
                return current.option == answer
                    ? { ...current, votes: current.votes + 1 }
                    : current;
            });

            await dbPoll.updateOne(
                { _id: id },
                {
                    $set: {
                        voted: [...poll.voted, token.id],
                        options: newOptions,
                    },
                }
            );
        }
        response.status(201).send({ op: "done" });
    } catch (err) {
        console.log(err);
        response.status(400).send({ error: "You cannot vote twice" });
    }
});
//

module.exports = router;
