const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.options("*", cors());

app.post("/login", (req, resp) => {
    console.log(req.body);
    resp.send({ data: "5000" });
});

app.listen(5000, () => {
    console.log("hi on port", port);
});
/**
 * 
 * login/register: post
 * 
 * polls: get
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */