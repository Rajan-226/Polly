const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

//connecting db
require("./config/dbconnection");

//Formalities to avoid cors error and to convert string format of resp to json
app.use(cors());
app.options("*", cors());
app.use(express.json());

const usersRoute = require("./routes/users");
const pollsRoute = require("./routes/polls");

app.use("/api/auth", usersRoute);

// app.use("*", function (req, res, next) {
//    // Authenticating the user
//   authenticateRequest(req, res, next);
// });

app.use("/api/polls", pollsRoute);

app.listen(5000, () => {
    console.log("App listening on port: ", port);
});
