const express = require("express");
const router = express.Router();
const db = require("./../models/users");
const jwt = require("jsonwebtoken");

router.post("/register", async function (request, response) {
    try {
        // console.log("hi I am inside register");

        const newUser = await db.create(request.body);

        console.log(newUser);

        const { id, username } = newUser;

        const token = jwt.sign({ id, username }, "secretHaiButKoiNi", {
            expiresIn: "1h",
        });

        response.status(201).send({ token });
    } catch (error) {
        console.log("error from register:  " + error);

        const temp = { error: true };

        if (error.code === 11000) {
            temp.message = "Sorry, that username is already taken";
        } else {
            temp.message = error;
        }

        response.status(400).send(temp);
    }
});

router.post("/login", async function (request, response) {
    try {
        // console.log("hi, I am inside login");

        const realUser = await db.findOne({
            username: request.body.username,
        });
        const { id, username } = realUser;
        const valid = await realUser.comparePassword(request.body.password);

        if (valid) {
            const token = jwt.sign({ id, username }, "secretHaiButKoiNi", {
                expiresIn: "1h",
            });

            response.status(200).send({ token });
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log("Error from login:  " + err);

        response.status(400).send({
            error: true,
            message: "Invalid Username/Password",
        });
    }
});

module.exports = router;
